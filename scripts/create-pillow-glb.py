#!/usr/bin/env python3
import json, math, os, struct
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'models' / 'biosleep-pillow.glb'
OUT.parent.mkdir(parents=True, exist_ok=True)

meshes = []
materials = [
    {"name": "warm beige brushed fabric", "pbrMetallicRoughness": {"baseColorFactor": [0.70, 0.57, 0.39, 1], "metallicFactor": 0.0, "roughnessFactor": 0.82}},
    {"name": "black raised welt piping", "pbrMetallicRoughness": {"baseColorFactor": [0.005, 0.005, 0.004, 1], "metallicFactor": 0.0, "roughnessFactor": 0.58}},
]

def sgnpow(v, p):
    return (1 if v >= 0 else -1) * (abs(v) ** p)

def add_mesh(name, verts, faces, mat_index):
    meshes.append({"name": name, "verts": verts, "faces": faces, "mat": mat_index})

# Soft rounded rectangular cushion body, based on the uploaded three-view references.
a, b, c = 2.85, 0.42, 1.12
nu, nv = 38, 80
verts = []
# superellipsoid: boxy rounded rectangle, low inflated profile
for i in range(nu + 1):
    eta = -math.pi / 2 + math.pi * i / nu
    ce, se = math.cos(eta), math.sin(eta)
    for j in range(nv):
        om = -math.pi + 2 * math.pi * j / nv
        co, so = math.cos(om), math.sin(om)
        x = a * sgnpow(ce, 0.30) * sgnpow(co, 0.22)
        y = b * sgnpow(se, 0.42)
        z = c * sgnpow(ce, 0.30) * sgnpow(so, 0.22)
        # cushion-like tailoring: flatter underside, fuller crown, slight fabric irregularity
        crown = max(0.0, y / b)
        y += 0.075 * crown * math.exp(-((x/a)**2 * 1.4 + (z/c)**2 * 1.1))
        if y < -0.28:
            y = -0.34 + (y + 0.34) * 0.45
        wrinkle = 0.012 * math.sin(x * 5.2 + z * 2.1) * math.sin(z * 4.7)
        y += wrinkle * (0.25 + 0.75 * crown)
        verts.append((x, y, z))
faces = []
for i in range(nu):
    for j in range(nv):
        a0 = i * nv + j
        a1 = i * nv + (j + 1) % nv
        b0 = (i + 1) * nv + j
        b1 = (i + 1) * nv + (j + 1) % nv
        faces.append((a0, b0, b1))
        faces.append((a0, b1, a1))
add_mesh('single soft low rectangular pillow body', verts, faces, 0)

# Helpers for black piping tubes.
def rounded_rect_path(width, depth, y, n=160):
    # superellipse perimeter, rounded rectangular look
    pts = []
    for k in range(n):
        t = 2 * math.pi * k / n
        x = (width / 2) * sgnpow(math.cos(t), 0.24)
        z = (depth / 2) * sgnpow(math.sin(t), 0.24)
        pts.append((x, y, z))
    return pts

def tube_from_path(name, path, radius=0.035, mat=1, sides=10, closed=False):
    verts, faces = [], []
    # ring around each path point; rings are kept roughly horizontal/vertical for stable glb export
    count = len(path)
    for idx, p in enumerate(path):
        px, py, pz = p
        if idx < count - 1:
            nx, ny, nz = path[idx + 1][0] - px, path[idx + 1][1] - py, path[idx + 1][2] - pz
        else:
            nx, ny, nz = px - path[idx - 1][0], py - path[idx - 1][1], pz - path[idx - 1][2]
        # tangent
        l = math.sqrt(nx*nx + ny*ny + nz*nz) or 1
        tx, ty, tz = nx/l, ny/l, nz/l
        # choose normal basis
        ux, uy, uz = 0, 1, 0
        # v = t cross u
        vx, vy, vz = ty*uz - tz*uy, tz*ux - tx*uz, tx*uy - ty*ux
        vl = math.sqrt(vx*vx + vy*vy + vz*vz)
        if vl < 1e-5:
            ux, uy, uz = 1, 0, 0
            vx, vy, vz = ty*uz - tz*uy, tz*ux - tx*uz, tx*uy - ty*ux
            vl = math.sqrt(vx*vx + vy*vy + vz*vz) or 1
        vx, vy, vz = vx/vl, vy/vl, vz/vl
        # u = v cross t
        ux, uy, uz = vy*tz - vz*ty, vz*tx - vx*tz, vx*ty - vy*tx
        for s in range(sides):
            ang = 2 * math.pi * s / sides
            cx, cy = math.cos(ang) * radius, math.sin(ang) * radius
            verts.append((px + ux*cy + vx*cx, py + uy*cy + vy*cx, pz + uz*cy + vz*cx))
    segs = count if closed else count - 1
    for i in range(segs):
        ni = (i + 1) % count
        for s in range(sides):
            a0 = i*sides + s
            a1 = i*sides + (s+1)%sides
            b0 = ni*sides + s
            b1 = ni*sides + (s+1)%sides
            faces.append((a0, b0, b1))
            faces.append((a0, b1, a1))
    add_mesh(name, verts, faces, mat)

# Perimeter welt: top seam and lower seam.
tube_from_path('continuous black upper perimeter piping', rounded_rect_path(5.82, 2.32, 0.05, 192), 0.035, closed=True)
tube_from_path('continuous black lower perimeter piping', rounded_rect_path(5.76, 2.26, -0.31, 192), 0.026, closed=True)

# Front horizontal welt line.
front_line = [(-2.55 + 5.10*i/120, -0.12 + 0.018*math.sin(i/120*math.pi), -1.125) for i in range(121)]
tube_from_path('black front horizontal seam piping', front_line, 0.026, closed=False)

# Curved decorative front seams, mirrored, matching uploaded design.
def bezier(p0,p1,p2,p3,n=72):
    pts=[]
    for i in range(n):
        t=i/(n-1)
        u=1-t
        pts.append(tuple(u**3*p0[k]+3*u*u*t*p1[k]+3*u*t*t*p2[k]+t**3*p3[k] for k in range(3)))
    return pts
left_curve = bezier((-2.42,-0.18,-1.13), (-2.15,0.02,-1.17), (-1.72,0.18,-1.10), (-1.28,0.25,-1.02))
right_curve = [(-x,y,z) for (x,y,z) in left_curve]
tube_from_path('left curved decorative black piping', left_curve, 0.028, closed=False)
tube_from_path('right curved decorative black piping', right_curve, 0.028, closed=False)

# Small right zipper/tag detail from one reference image.
tag_verts = [(2.62,-0.18,1.06),(2.78,-0.18,1.04),(2.80,-0.37,1.02),(2.60,-0.36,1.04)]
tag_faces = [(0,1,2),(0,2,3)]
add_mesh('small beige side fabric tab', tag_verts, tag_faces, 0)

# Build binary glb manually.
buffer = bytearray()
accessors = []
buffer_views = []
gltf_meshes = []
nodes = []

def align4():
    while len(buffer) % 4:
        buffer.append(0)

def add_accessor(data_bytes, component_type, type_str, count, target=None, minv=None, maxv=None):
    align4()
    offset = len(buffer)
    buffer.extend(data_bytes)
    bv = {"buffer": 0, "byteOffset": offset, "byteLength": len(data_bytes)}
    if target:
        bv["target"] = target
    buffer_views.append(bv)
    acc = {"bufferView": len(buffer_views)-1, "byteOffset": 0, "componentType": component_type, "count": count, "type": type_str}
    if minv is not None: acc["min"] = minv
    if maxv is not None: acc["max"] = maxv
    accessors.append(acc)
    return len(accessors)-1

for mi, m in enumerate(meshes):
    verts = m['verts']; faces = m['faces']
    pos_bytes = b''.join(struct.pack('<3f', *v) for v in verts)
    minv = [min(v[k] for v in verts) for k in range(3)]
    maxv = [max(v[k] for v in verts) for k in range(3)]
    pos_acc = add_accessor(pos_bytes, 5126, 'VEC3', len(verts), 34962, minv, maxv)
    flat_idx = [i for f in faces for i in f]
    idx_bytes = b''.join(struct.pack('<I', i) for i in flat_idx)
    idx_acc = add_accessor(idx_bytes, 5125, 'SCALAR', len(flat_idx), 34963, [min(flat_idx)], [max(flat_idx)])
    gltf_meshes.append({"name": m['name'], "primitives": [{"attributes": {"POSITION": pos_acc}, "indices": idx_acc, "material": m['mat']} ]})
    nodes.append({"name": m['name'], "mesh": len(gltf_meshes)-1})

gltf = {
    "asset": {"version": "2.0", "generator": "Hermes procedural pillow model from uploaded references"},
    "scene": 0,
    "scenes": [{"nodes": list(range(len(nodes)))}],
    "nodes": nodes,
    "meshes": gltf_meshes,
    "materials": materials,
    "buffers": [{"byteLength": len(buffer)}],
    "bufferViews": buffer_views,
    "accessors": accessors,
}
json_chunk = json.dumps(gltf, separators=(',', ':')).encode('utf-8')
while len(json_chunk) % 4:
    json_chunk += b' '
while len(buffer) % 4:
    buffer.append(0)
length = 12 + 8 + len(json_chunk) + 8 + len(buffer)
with open(OUT, 'wb') as f:
    f.write(struct.pack('<4sII', b'glTF', 2, length))
    f.write(struct.pack('<I4s', len(json_chunk), b'JSON'))
    f.write(json_chunk)
    f.write(struct.pack('<I4s', len(buffer), b'BIN\x00'))
    f.write(buffer)
print(OUT)
print(f"meshes={len(meshes)} vertices={sum(len(m['verts']) for m in meshes)} faces={sum(len(m['faces']) for m in meshes)} size={OUT.stat().st_size}")
