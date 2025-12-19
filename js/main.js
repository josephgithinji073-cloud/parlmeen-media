
document.addEventListener("DOMContentLoaded", () => {
    const radioBtn = document.getElementById("radioBtn");
    const radio = document.getElementById("radioStream");

    let isPlaying = false;

    radioBtn.addEventListener("click", () => {
        if (!isPlaying) {
            radio.play();
            radioBtn.textContent = "⏸";
        } else {
            radio.pause();
            radioBtn.textContent = "▶";
        }
        isPlaying = !isPlaying;
    });
});


/* =====================================================
   INTRO OVERLAY REMOVAL
===================================================== */
window.addEventListener("load", () => {
    const intro = document.getElementById("intro");
    if (!intro) return;

    setTimeout(() => {
        intro.style.opacity = "0";
        intro.style.pointerEvents = "none";

        setTimeout(() => intro.remove(), 800);
    }, 1800);
});

/* =====================================================
   ABOUT IMAGE SLIDER (CSS-ASSISTED)
===================================================== */
const aboutSliderImages = document.querySelectorAll(".about-slider img");
let sliderIndex = 0;

if (aboutSliderImages.length > 0) {
    setInterval(() => {
        aboutSliderImages.forEach(img => img.classList.remove("active"));
        sliderIndex = (sliderIndex + 1) % aboutSliderImages.length;
        aboutSliderImages[sliderIndex].classList.add("active");
    }, 4000);
}

/* =====================================================
   SCROLL REVEAL (INTERSECTION OBSERVER)
===================================================== */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealElements.forEach(el => revealObserver.observe(el));
} else {
    // Fallback for very old browsers
    revealElements.forEach(el => el.classList.add("active"));
}

/* =====================================================
   SUBTLE 3D HOVER EFFECT (CARDS ONLY)
===================================================== */
const hoverCards = document.querySelectorAll(
    ".service-box div, .focus li, .work-card, .media-card"
);

hoverCards.forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * 6;
        const rotateY = ((x / rect.width) - 0.5) * -6;

        card.style.transform =
            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});

/* =====================================================
   SMOOTH INTERNAL LINK SCROLL
===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

/* =====================================================
   CONTACT FORM HANDLING (FRONT-END ONLY)
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");

    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();

        const name = document.getElementById("name")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const message = document.getElementById("message")?.value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all required fields.");
            return;
        }

        if (successMessage) {
            successMessage.style.display = "block";
        }

        form.reset();
    });
});


/* =====================================================
   IMPACT 3D INTERACTIVE SCENE
===================================================== */

const container = document.querySelector(".impact-3d");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

// Camera
const camera = new THREE.PerspectiveCamera(
  60,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 6);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1.2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// 🌍 Earth
const earthGeo = new THREE.SphereGeometry(1.2, 64, 64);
const earthMat = new THREE.MeshStandardMaterial({
  color: 0x2194ce,
  roughness: 0.6,
  metalness: 0.3,
});
const earth = new THREE.Mesh(earthGeo, earthMat);
scene.add(earth);

// Floating 3D Objects representing your impact content
const loader = new THREE.FontLoader();
loader.load(
  "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
  function (font) {
    const createText = (message, position, color) => {
      const textGeo = new THREE.TextGeometry(message, {
        font: font,
        size: 0.2,
        height: 0.05,
      });
      const textMat = new THREE.MeshStandardMaterial({ color: color });
      const mesh = new THREE.Mesh(textGeo, textMat);
      mesh.position.copy(position);
      scene.add(mesh);
      return mesh;
    };

    const womenText = createText(
      "Women Empowerment",
      new THREE.Vector3(-2, 1.5, 0),
      0xff69b4
    );
    const youthText = createText(
      "Youth Engagement",
      new THREE.Vector3(2, 1, 1),
      0x00ff00
    );
    const climateText = createText(
      "Climate Action",
      new THREE.Vector3(0, 2, -2),
      0xffff00
    );

    const floatingObjects = [womenText, youthText, climateText];

    // Animate floating effect
    function animateObjects() {
      const time = Date.now() * 0.001;
      floatingObjects.forEach((obj, i) => {
        obj.position.y += Math.sin(time + i) * 0.003;
        obj.rotation.y += 0.005;
      });
    }

    // Animate loop
    function animate() {
      requestAnimationFrame(animate);
      earth.rotation.y += 0.002;
      animateObjects();
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }
);

// Responsive
window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});


// new redio
