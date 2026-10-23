const initialProducts = [
    {
        code: "IP14-128",
        name: "iPhone 14",
        category: "iPhone khác",
        color: "Đen",
        storage: "128GB",
        price: 15990000,
        stock: 15,
        status: "Đang kinh doanh",
        image: "https://tse2.mm.bing.net/th/id/OIP.QSxqM3kv2aRiU6_5ZXpxcQHaHa?r=0&pid=ImgDet&w=474&h=474&rs=1&o=7&rm=3"
    },
    {
        code: "IP15PM-256",
        name: "iPhone 15 Pro Max",
        category: "iPhone 15 Series",
        color: "Titan Tự Nhiên",
        storage: "256GB",
        price: 29990000,
        stock: 12,
        status: "Đang kinh doanh",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=85"
    },
    {
        code: "IP15-128",
        name: "iPhone 15",
        category: "iPhone 15 Series",
        color: "Hồng",
        storage: "128GB",
        price: 18990000,
        stock: 25,
        status: "Đang kinh doanh",
        image: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/118/MTA-156657988/no-brand_ip-15-pro-max-256gb-garansi-resmi-indonesia_full04.jpg"
    },
    {
        code: "IP16PM-512",
        name: "iPhone 16 Pro Max",
        category: "iPhone 16 Series",
        color: "Titan Đen",
        storage: "512GB",
        price: 37990000,
        stock: 6,
        status: "Đang kinh doanh",
        image: "https://m.media-amazon.com/images/I/61rriyfRKwL.jpg"
    },
    {
        code: "IP16-256",
        name: "iPhone 16",
        category: "iPhone 16 Series",
        color: "Xanh",
        storage: "256GB",
        price: 22990000,
        stock: 0,
        status: "Ngừng kinh doanh",
        image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=400&q=85"
    },
    {
        code: "IP17PM-256",
        name: "iPhone 17 Pro Max",
        category: "iPhone 17 Series",
        color: "Trắng",
        storage: "256GB",
        price: 34990000,
        stock: 8,
        status: "Đang kinh doanh",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=85"
    }
];

let products = [...initialProducts];
const $ = id => document.getElementById(id);
const money = n => Number(n).toLocaleString("vi-VN") + " ₫";
const escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

function toast(msg) {
    const t = $("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2600);
}

function refreshCategories() {
    const old = $("categoryFilter")?.value || "";
    const cats = [...new Set(products.map(p => p.category))];
    
    const defaultOption = '<option value="">Tất cả danh mục</option>';
    const extraOptions = cats.map(c => `<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join("");
    
    if ($("categoryFilter")) $("categoryFilter").innerHTML = defaultOption + extraOptions;
    if ($("category")) $("category").innerHTML = '<option value="">Chọn danh mục</option>' + extraOptions;
    
    if ($("categoryFilter")) $("categoryFilter").value = cats.includes(old) ? old : "";
}

function render() {
    const q = ($("tableSearch")?.value || $("searchInput")?.value || "").trim().toLowerCase();
    const cat = $("categoryFilter")?.value || "";
    const status = $("statusFilter")?.value || "";

    const shown = products.filter(p => 
        (!q || (p.code + " " + p.name).toLowerCase().includes(q)) && 
        (!cat || p.category === cat) && 
        (!status || p.status === status)
    );

    if ($("productRows")) {
        $("productRows").innerHTML = shown.length ? shown.map(p => `
            <tr>
                <td><input type="checkbox" class="row-check" data-code="${escapeHTML(p.code)}" aria-label="Chọn ${escapeHTML(p.name)}"></td>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy" style="width: 40px; height: 40px; object-fit: contain; border-radius: 6px; background: #fff; padding: 2px;" onerror="this.onerror=null; this.src='https://placehold.co/100x100/f5f5f7/333333?text=iPhone';"/>
                        <div>
                            <div style="font-weight: 600;">${escapeHTML(p.name)}</div>
                            <div style="font-size: 12px; color: #666;">${escapeHTML(p.color)} · ${escapeHTML(p.storage)}</div>
                        </div>
                    </div>
                </td>
                <td><code>${escapeHTML(p.code)}</code></td>
                <td>${escapeHTML(p.category)}</td>
                <td style="font-weight: 600; color: #0071e3;">${money(p.price)}</td>
                <td style="color: ${p.stock < 10 ? '#d93838' : '#2ecc71'}; font-weight: 600;">${p.stock}</td>
                <td><span style="padding: 4px 8px; border-radius: 4px; font-size: 12px; background: ${p.status === 'Đang kinh doanh' ? '#e8f8f0; color: #2ecc71;' : '#f8f9fa; color: #6c757d;'}">${escapeHTML(p.status)}</span></td>
                <td>
                    <div style="display: flex; gap: 6px;">
                        <button class="btn btn-outline" style="padding: 4px 8px;" title="Sửa" data-action="edit" data-code="${escapeHTML(p.code)}"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></button>
                        <button class="btn btn-outline" style="padding: 4px 8px;" title="Đổi trạng thái" data-action="toggle" data-code="${escapeHTML(p.code)}"><i data-lucide="repeat" style="width: 14px; height: 14px;"></i></button>
                        <button class="btn btn-outline" style="padding: 4px 8px; color: #d93838; border-color: #d93838;" title="Xóa" data-action="delete" data-code="${escapeHTML(p.code)}"><i data-lucide="trash-2" style="width: 14px; height: 14px;"></i></button>
                    </div>
                </td>
            </tr>
        `).join("") : '<tr><td colspan="8" style="text-align: center; padding: 20px; color: #666;">Không tìm thấy sản phẩm phù hợp.</td></tr>';
    }

    if ($("totalStat")) $("totalStat").textContent = products.length;
    if ($("activeStat")) $("activeStat").textContent = products.filter(p => p.status === "Đang kinh doanh").length;
    if ($("lowStat")) $("lowStat").textContent = products.filter(p => p.stock < 10).length;
    if ($("valueStat")) $("valueStat").textContent = money(products.reduce((sum, p) => sum + p.price * p.stock, 0));
    if ($("resultCount")) $("resultCount").textContent = `Hiển thị ${shown.length} / ${products.length} sản phẩm`;
    
    if ($("selectAll")) $("selectAll").checked = false;

    if (window.lucide) {
        lucide.createIcons();
    }
}

function openModal(product) {
    if ($("productForm")) $("productForm").reset();
    if ($("formError")) $("formError").textContent = "";
    if ($("originalCode")) $("originalCode").value = product ? product.code : "";
    if ($("modalTitle")) $("modalTitle").textContent = product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới";
    if ($("code")) $("code").disabled = !!product;

    ["code", "name", "category", "image", "color", "storage", "price", "stock", "status"].forEach(k => {
        if ($(k)) {
            $(k).value = product ? product[k] : (k === "status" ? "Đang kinh doanh" : "");
        }
    });

    if ($("productModal")) {
        // Sửa từ "open" thành "show" để khớp hoàn toàn với CSS (.modal-backdrop.show)
        $("productModal").classList.add("show");
        $("productModal").setAttribute("aria-hidden", "false");
    }
}

function closeModal() {
    if ($("productModal")) {
        // Sửa từ "open" thành "show"
        $("productModal").classList.remove("show");
        $("productModal").setAttribute("aria-hidden", "true");
    }
    if ($("code")) $("code").disabled = false;
}

// Sự kiện tương tác
if ($("addBtn")) $("addBtn").addEventListener("click", () => openModal(null));
if ($("closeModal")) $("closeModal").addEventListener("click", closeModal);
if ($("cancelModal")) $("cancelModal").addEventListener("click", closeModal);
if ($("productModal")) {
    $("productModal").addEventListener("click", e => {
        if (e.target === $("productModal")) closeModal();
    });
}

if ($("searchInput")) {
    $("searchInput").addEventListener("input", e => {
        if ($("tableSearch")) $("tableSearch").value = e.target.value;
        render();
    });
}
if ($("tableSearch")) {
    $("tableSearch").addEventListener("input", e => {
        if ($("searchInput")) $("searchInput").value = e.target.value;
        render();
    });
}

["categoryFilter", "statusFilter"].forEach(id => {
    if ($(id)) $(id).addEventListener("change", render);
});

if ($("resetFilter")) {
    $("resetFilter").addEventListener("click", () => {
        if ($("searchInput")) $("searchInput").value = "";
        if ($("tableSearch")) $("tableSearch").value = "";
        if ($("categoryFilter")) $("categoryFilter").value = "";
        if ($("statusFilter")) $("statusFilter").value = "";
        render();
    });
}

if ($("refreshBtn")) {
    $("refreshBtn").addEventListener("click", () => {
        render();
        toast("Đã làm mới danh sách sản phẩm.");
    });
}

if ($("productRows")) {
    $("productRows").addEventListener("click", e => {
        const b = e.target.closest("button[data-action]");
        if (!b) return;
        const p = products.find(x => x.code === b.dataset.code);
        if (!p) return;

        if (b.dataset.action === "edit") openModal(p);
        if (b.dataset.action === "toggle") {
            p.status = p.status === "Đang kinh doanh" ? "Ngừng kinh doanh" : "Đang kinh doanh";
            render();
            toast("Đã cập nhật trạng thái sản phẩm.");
        }
        if (b.dataset.action === "delete") {
            if (confirm(`Bạn có chắc muốn xóa sản phẩm "${p.name}"?`)) {
                products = products.filter(x => x.code !== p.code);
                refreshCategories();
                render();
                toast("Đã xóa sản phẩm.");
            }
        }
    });
}

if ($("productForm")) {
    $("productForm").addEventListener("submit", e => {
        e.preventDefault();
        const original = $("originalCode")?.value || "";
        const p = {
            code: $("code")?.value.trim() || "",
            name: $("name")?.value.trim() || "",
            category: $("category")?.value || "",
            image: $("image")?.value.trim() || "",
            color: $("color")?.value || "",
            storage: $("storage")?.value || "",
            price: Number($("price")?.value || 0),
            stock: Number($("stock")?.value || 0),
            status: $("status")?.value || "Đang kinh doanh"
        };

        if (!p.code || !p.name || !p.category || !p.image || !p.color || !p.storage || $("price").value === "" || $("stock").value === "") {
            if ($("formError")) $("formError").textContent = "Vui lòng nhập đầy đủ các trường bắt buộc.";
            return;
        }
        if (!original && products.some(x => x.code.toLowerCase() === p.code.toLowerCase())) {
            if ($("formError")) $("formError").textContent = "Mã sản phẩm đã tồn tại. Vui lòng nhập mã khác.";
            return;
        }
        if (p.price < 0 || p.stock < 0 || !Number.isInteger(p.stock)) {
            if ($("formError")) $("formError").textContent = "Đơn giá và tồn kho phải không âm; tồn kho phải là số nguyên.";
            return;
        }

        if (original) {
            const idx = products.findIndex(x => x.code === original);
            if (idx !== -1) products[idx] = p;
            toast("Cập nhật sản phẩm thành công.");
        } else {
            products.unshift(p);
            toast("Thêm sản phẩm mới thành công.");
        }

        closeModal();
        refreshCategories();
        render();
    });
}

if ($("selectAll")) {
    $("selectAll").addEventListener("change", e => {
        document.querySelectorAll(".row-check").forEach(c => c.checked = e.target.checked);
    });
}

if ($("exportBtn")) {
    $("exportBtn").addEventListener("click", () => {
        const rows = [
            ["MaSanPham", "TenSanPham", "MaDanhMuc", "HinhAnh", "MauSac", "DungLuong", "DonGia", "SoLuongTon", "TrangThai"],
            ...products.map(p => [p.code, p.name, p.category, p.image, p.color, p.storage, p.price, p.stock, p.status])
        ];
        const csv = "\ufeff" + rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\r\n");
        const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
        const a = document.createElement("a");
        a.href = url;
        a.download = "danh-sach-san-pham.csv";
        a.click();
        URL.revokeObjectURL(url);
        toast("Đã xuất danh sách CSV.");
    });
}

if ($("logoutBtn")) {
    $("logoutBtn").addEventListener("click", () => {
        if (confirm("Bạn muốn đăng xuất khỏi giao diện demo?")) {
            toast("Đã đăng xuất hệ thống demo.");
        }
    });
}

// Khởi chạy ban đầu
refreshCategories();
render();