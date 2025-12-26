/* =========================================
   1. CÁC BIẾN CHUNG (COMMON)
   ========================================= */
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sideMenu = document.getElementById("side-menu");
const backdrop = document.getElementById("backdrop");
const cursor = document.querySelector('.custom-cursor');

/* --- Menu Logic --- */
if (menuBtn && sideMenu) {
    menuBtn.onclick = () => {
        sideMenu.classList.add("open");
        sideMenu.style.opacity = "1";
        sideMenu.style.visibility = "visible";
    };

    const hideMenu = () => {
        sideMenu.classList.remove("open");
        sideMenu.style.opacity = "0";
        sideMenu.style.visibility = "hidden";
    };

    if (closeBtn) closeBtn.onclick = hideMenu;
    if (backdrop) backdrop.onclick = hideMenu;
}

/* --- Custom Cursor --- */
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const interactiveElements = document.querySelectorAll('a, img, .menu-icon, .tarot-card, .tab-btn, .arrow');
    interactiveElements.forEach(item => {
        item.addEventListener('mouseover', () => cursor.classList.add('active'));
        item.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
}

/* =========================================
   2. GRAPHIC PAGE: GALLERY & TABS
   ========================================= */
const mainImage = document.getElementById("mainImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const tabBtns = document.querySelectorAll(".tab-btn");
const projectTitle = document.querySelector(".project-title");
const projectDesc = document.querySelector(".project-description p");

if (mainImage && prevBtn && nextBtn) {
    const projectData = [
        {
            title: "Teacher Appreciation Day",
            description: "These merchandise items serve as a tribute to teachers’ commitment and steadfast determination in guiding students towards a better future. In Vietnam, teachers are often regarded as second parents, reflecting the profound respect and appreciation accorded to them.",
            images: ["a2_assets/20_11_postcardfront.png", "a2_assets/20_11_postcardback.png", "a2_assets/20_11_signage.png"]
        },
        {
            title: "Music Event Poster",
            description: "The Fa Sai Gon music event poster captures the vibrant energy of Saigon's nightlife. The design features bold typography and dynamic graphics to evoke the lively atmosphere of the city's music scene.",
            images: ["a2_assets/fasaigon.png"]
        },
        {
            title: "Merch Design - Bepop!",
            description: "These printed t-shirt designs were sold in an imaginary jazz concert. The designs incorporate vibrant colors and playful typography to capture the lively spirit of jazz music.",
            images: ["a2_assets/DMS2_1.png", "a2_assets/DMS2_2.png", "a2_assets/DMS2_3.png"]
        }
    ];

    let currentTab = 0;
    let currentSlide = 0;

    function updateGallery() {
        const data = projectData[currentTab];
        
        // Cập nhật nội dung
        mainImage.src = data.images[currentSlide];
        if (projectTitle) projectTitle.innerText = data.title;
        if (projectDesc) projectDesc.innerText = data.description;

        // Xử lý ẩn/hiện mũi tên (Dùng visibility để không làm lệch layout)
        prevBtn.style.visibility = (currentSlide === 0) ? "hidden" : "visible";
        nextBtn.style.visibility = (currentSlide === data.images.length - 1) ? "hidden" : "visible";
    }

    // --- SỰ KIỆN CLICK MŨI TÊN (QUAN TRỌNG) ---
    nextBtn.addEventListener("click", () => {
        if (currentSlide < projectData[currentTab].images.length - 1) {
            currentSlide++;
            updateGallery();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateGallery();
        }
    });

    // --- SỰ KIỆN CHUYỂN TAB ---
    tabBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            currentTab = index;
            currentSlide = 0; 
            
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            updateGallery();
        });
    });

    // Khởi tạo gallery khi load trang
    updateGallery();
}

/* =========================================
   3. CÁC TÍNH NĂNG KHÁC (TAROT, SCROLL, TOP)
   ========================================= */
// Tarot Scroll
const scrollContainer = document.querySelector('.tarot-scroll-wrapper');
if (scrollContainer) {
    scrollContainer.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
    }, { passive: false });
}

// Tarot Flip
document.querySelectorAll('.tarot-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (!this.classList.contains('flipped')) {
            e.preventDefault();
            this.classList.add('flipped');
        }
    });
});

// Back to Top
const backToTop = document.getElementById("backToTop");
if (backToTop) {
    backToTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =========================================
   WEB PAGE: TAB LOGIC (Interactive & DMS2)
   ========================================= */
const webIframe = document.getElementById("webIframe");
const webTabBtns = document.querySelectorAll(".tab-btn");
const webTitle = document.querySelector(".project-title");
const webDesc = document.querySelector(".project-description p");
const webBackToTop = document.getElementById("backToTop");
const webHighlights = document.getElementById("webHighlights"); // Thêm dòng này

if (webIframe && webTabBtns.length > 0) {
    const webProjectData = [
        {
            title: "A Tender Glow",
            description: "'A Tender Glow' is a collaborative poem (written with ChatGPT), inspired by Laufey's 'A Night to Remember'. The objective is to create a dreamy, elegant interface that conveys the couple's emotions while ensuring a relaxing user experience.",
            videoEmbedUrl: "https://www.youtube.com/embed/We8HQm9GmmM", 
            showBackToTop: true,
            showHighlights: true // Hiện Visual Highlights cho tab này
        },
        {
            title: "Bepop! A jazz event",
            description: "'Bepop! A jazz event' is an imaginary event website for a jazz concert. Through this website, users can immerse themselves into the world of jazz, where you can buy tickets, merchandises and a lot more!",
            videoEmbedUrl: "https://www.youtube.com/embed/AS5c2F5rLXc",
            showBackToTop: false,
            showHighlights: false // Ẩn Visual Highlights cho tab này
        }
    ];

    function updateWebGallery(index) {
        const data = webProjectData[index];
        
        webIframe.src = data.videoEmbedUrl;
        if (webTitle) webTitle.innerText = data.title;
        if (webDesc) webDesc.innerText = data.description;

        // Xử lý hiển thị nút Back to Top
        if (webBackToTop) {
            webBackToTop.style.display = data.showBackToTop ? "block" : "none";
        }

        // Xử lý ẩn/hiện toàn bộ phần Visual Highlights
        if (webHighlights) {
            webHighlights.style.display = data.showHighlights ? "flex" : "none";
        }
    }

    webTabBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            webTabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            updateWebGallery(index);
        });
    });

    updateWebGallery(0);
}

// Tính năng mở Video toàn màn hình khi click
const videoContainer = document.querySelector('.video-container iframe');

if (videoContainer) {
    videoContainer.addEventListener('click', () => {
        if (videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen();
        } else if (videoContainer.webkitRequestFullscreen) { /* Safari */
            videoContainer.webkitRequestFullscreen();
        } else if (videoContainer.msRequestFullscreen) { /* IE11 */
            videoContainer.msRequestFullscreen();
        }
    });
}
/* --- Menu Logic Cải Tiến --- */
if (menuBtn && sideMenu) {
    // Tìm hoặc tạo backdrop nếu chưa có trong HTML
    let backdrop = document.getElementById("backdrop");
    
    // Hàm mở menu
    menuBtn.onclick = (e) => {
        e.stopPropagation(); // Ngăn sự kiện nổi bọt
        sideMenu.classList.add("open");
        sideMenu.style.opacity = "1";
        sideMenu.style.visibility = "visible";
        
        if (backdrop) {
            backdrop.classList.add("active");
        }
    };

    // Hàm đóng menu
    const hideMenu = () => {
        sideMenu.classList.remove("open");
        sideMenu.style.opacity = "0";
        sideMenu.style.visibility = "hidden";
        
        if (backdrop) {
            backdrop.classList.remove("active");
        }
    };

    // Đóng khi nhấn nút X
    if (closeBtn) closeBtn.onclick = hideMenu;

    // 1. Đóng khi nhấn trực tiếp vào lớp nền mờ (Backdrop)
    if (backdrop) {
        backdrop.onclick = hideMenu;
    }

    // 2. Chức năng quan trọng: Đóng khi nhấn bất kỳ vùng nào ngoài overlay
    window.addEventListener("click", (e) => {
        // Kiểm tra nếu menu đang mở
        const isOpen = sideMenu.classList.contains("open");
        
        // Nếu click không nằm trong sideMenu và không phải là nút mở menu
        if (isOpen && !sideMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            hideMenu();
        }
    });
}