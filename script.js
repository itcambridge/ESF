// Main JavaScript for Economic Symmetry Forum

document.addEventListener('DOMContentLoaded', () => {
  // Initialize year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  
  // Video Modal Functionality
  function setupVideoModal() {
    const videoThumbnail = document.querySelector('.video-thumbnail');
    const openVideoBtn = document.getElementById('openVideoBtn');
    const videoModal = document.getElementById('videoModal');
    const closeVideoBtn = document.getElementById('closeVideoBtn');
    const youtubePlayer = document.getElementById('youtubePlayer');
    
    // Set the YouTube video ID
    const videoId = 'kw6a2cUG6yY';
    
    if (videoThumbnail && videoModal && closeVideoBtn && youtubePlayer) {
      // Function to open the modal
      function openModal() {
        // Set the YouTube embed URL when opening the modal
        youtubePlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        videoModal.classList.add('open');
        document.body.classList.add('modal-open');
      }
      
      // Function to close the modal
      function closeModal() {
        videoModal.classList.remove('open');
        document.body.classList.remove('modal-open');
        // Reset iframe src to stop the video
        youtubePlayer.src = 'about:blank';
      }
      
      // Event listeners
      videoThumbnail.addEventListener('click', openModal);
      openVideoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
      
      closeVideoBtn.addEventListener('click', closeModal);
      
      // Close modal when clicking outside the video
      videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
          closeModal();
        }
      });
      
      // Close modal with Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('open')) {
          closeModal();
        }
      });
    }
  }
  
  setupVideoModal();

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
      const isOpen = document.body.classList.contains('menu-open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      
      // Toggle appearance of the menu button
      const spans = menuToggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Stakeholders data and functionality
  const stakeholderData = [
    // Productive Economy
    { group: "Manufacturers & Industrial Workers", concern: "Offshoring, subsidised imports, energy costs, skills erosion", goal: "Restore domestic productive capacity", lever: "Productive capital allocation", community: "Productive Economy" },
    { group: "Tradespeople & Skilled Labour", concern: "Wage pressure, credential inflation, labour oversupply", goal: "Fair labour pricing & skills alignment", lever: "Labour market signals", community: "Productive Economy" },
    { group: "Supply Chain & Logistics Operators", concern: "Energy, transport costs, trade distortions", goal: "Stable, efficient trade flows", lever: "Trade & energy inputs", community: "Productive Economy" },
    { group: "Family-owned & Multi-generation Businesses", concern: "Inheritance tax, capital erosion, policy instability", goal: "Intergenerational capital preservation", lever: "Capital retention", community: "Productive Economy" },
    { group: "Entrepreneurs & Startups", concern: "Capital crowding-out by government balance sheets", goal: "Access to risk capital", lever: "Productive investment", community: "Productive Economy" },

    // Households
    { group: "Middle-income households", concern: "Cost of living, housing inflation, wage stagnation", goal: "Economic stability & purchasing power", lever: "Monetary transmission", community: "Households" },
    { group: "Savers & Pensioners", concern: "Currency debasement, asset inflation, fixed incomes", goal: "Preserve real savings value", lever: "Money supply effects", community: "Households" },
    { group: "Young adults / First-time buyers", concern: "Housing access, debt dependence", goal: "Affordable entry into adulthood", lever: "Credit allocation", community: "Households" },
    { group: "Parents & Caregivers", concern: "Service pressure, long-term social stability", goal: "Sustainable public services", lever: "Demographic & fiscal balance", community: "Households" },

    // Housing & Land
    { group: "Renters", concern: "Rent inflation, housing scarcity", goal: "Housing affordability", lever: "Land & housing supply", community: "Housing" },
    { group: "Small landlords (non-institutional)", concern: "Regulatory instability, tax burden", goal: "Predictable housing policy", lever: "Housing regulation", community: "Housing" },
    { group: "Homebuilders & Construction Firms", concern: "Planning delays, materials costs", goal: "Increase housing supply", lever: "Planning & materials", community: "Housing" },

    // Governance & Reform
    { group: "Civil Liberties & Due Process Advocates", concern: "Emergency powers becoming permanent", goal: "Restore legal normalcy", lever: "Governance legitimacy", community: "Governance" },
    { group: "Decentralisation / Localism Advocates", concern: "Loss of local economic control", goal: "Local decision-making", lever: "Local governance", community: "Governance" },
    { group: "Regulatory Reformers", concern: "Capture by large incumbents", goal: "Fair competition", lever: "Regulatory structure", community: "Governance" },
    { group: "Public Sector Workers (front-line)", concern: "Doing more with less, trust erosion", goal: "Service sustainability", lever: "State capacity", community: "Governance" },

    // Energy & Physical constraints
    { group: "Grid & Infrastructure Engineers", concern: "Targets detached from capacity; resilience risk", goal: "Resilient infrastructure", lever: "Physical infrastructure", community: "Constraints" },
    { group: "Resource Security Advocates", concern: "Supply chain vulnerability", goal: "Secure inputs", lever: "Resource access", community: "Constraints" },
    { group: "Mining & Materials Producers", concern: "Permitting delays, supply insecurity", goal: "Domestic resource development", lever: "Materials supply", community: "Constraints" },
    { group: "Nuclear & Transitional Energy Advocates", concern: "Ideological exclusion; reliability concerns", goal: "Reliable baseload power", lever: "Energy mix", community: "Constraints" },

    // Trade integrity
    { group: "Subsidy Transparency Advocates", concern: "Hidden state support and market distortion", goal: "Policy transparency", lever: "Information symmetry", community: "Trade Integrity" },
    { group: "SME Exporters", concern: "Distorted competition; tariff uncertainty", goal: "Export viability", lever: "Trade access", community: "Trade Integrity" },
    { group: "Import-dependent Retailers", concern: "Cost volatility and supply instability", goal: "Stable sourcing", lever: "Supply stability", community: "Trade Integrity" },

    // Finance / monetary
    { group: "Risk & Credit Professionals", concern: "Mispriced risk, moral hazard", goal: "Accurate risk signalling", lever: "Credit allocation", community: "Finance" },
    { group: "Long-term Institutional Investors", concern: "Short-termism; distorted incentives", goal: "Long-term value creation", lever: "Capital time horizon", community: "Finance" },
    { group: "Independent Economists", concern: "Narrative capture; weak cause-effect literacy", goal: "Cause-effect clarity", lever: "Economic modelling", community: "Finance" },
  ];

  const rowsEl = document.getElementById('rows');
  const filtersEl = document.getElementById('filters');
  const qEl = document.getElementById('q');
  const clearBtn = document.getElementById('clearBtn');

  // Only initialize if these elements exist on the page
  if (rowsEl && filtersEl && qEl && clearBtn) {
    // Create list of unique communities
    const communities = ["All", ...Array.from(new Set(stakeholderData.map(d => d.community)))];
    let activeCommunity = "All";

    // Create filter chips
    function makeChip(label) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      btn.textContent = label;
      btn.setAttribute("aria-pressed", label === activeCommunity ? "true" : "false");
      btn.addEventListener("click", () => {
        activeCommunity = label;
        // Update all chip states
        Array.from(filtersEl.children).forEach(c => 
          c.setAttribute("aria-pressed", c.textContent === activeCommunity ? "true" : "false")
        );
        render();
      });
      return btn;
    }

    // Render stakeholder data with filters
    function render() {
      const q = (qEl.value || "").trim().toLowerCase();
      const filtered = stakeholderData.filter(d => {
        const inCommunity = activeCommunity === "All" || d.community === activeCommunity;
        if (!inCommunity) return false;
        if (!q) return true;
        // Search all fields
        const blob = `${d.group} ${d.concern} ${d.goal} ${d.lever} ${d.community}`.toLowerCase();
        return blob.includes(q);
      });

      // Build table rows
      rowsEl.innerHTML = filtered.map(d => `
        <tr>
          <td><b>${escapeHtml(d.group)}</b></td>
          <td class="muted">${escapeHtml(d.concern)}</td>
          <td>${escapeHtml(d.goal)}</td>
          <td class="muted">${escapeHtml(d.lever)}</td>
          <td><span class="pill">${escapeHtml(d.community)}</span></td>
        </tr>
      `).join("");

      // Show message if no results
      if (filtered.length === 0) {
        rowsEl.innerHTML = `<tr><td colspan="5" class="muted">No matches. Try a broader search (e.g. "trade", "housing", "energy").</td></tr>`;
      }
    }

    // Escape HTML for security
    function escapeHtml(str) {
      return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    // Initialize filters and events
    communities.forEach(c => filtersEl.appendChild(makeChip(c)));
    qEl.addEventListener("input", render);
    clearBtn.addEventListener("click", () => {
      qEl.value = "";
      activeCommunity = "All";
      Array.from(filtersEl.children).forEach(c => 
        c.setAttribute("aria-pressed", c.textContent === activeCommunity ? "true" : "false")
      );
      render();
    });

    // Initial render
    render();
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });

  // Form submission for newsletter (prevent default and show confirmation)
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        // Clear the input
        const email = emailInput.value;
        emailInput.value = '';
        
        // Show success message
        const formContainer = this.querySelector('.form-input-group');
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = `Thank you! ${email} has been subscribed to our newsletter.`;
        formContainer.innerHTML = '';
        formContainer.appendChild(successMsg);
        
        // You would typically send this to a server
        console.log('Newsletter subscription for:', email);
      }
    });
  }

  // Add scroll-based animations if needed
  function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver(handleIntersection, observerOptions);
  document.querySelectorAll('.section, .card, .spotlight-card, .geography-card, .initiative-card').forEach(elem => {
    elem.classList.add('animate-on-scroll');
    observer.observe(elem);
  });

  // Additional functionality for mobile navigation
  function setupMobileNav() {
    // Create mobile nav container if it doesn't exist yet
    if (!document.querySelector('.mobile-nav')) {
      const nav = document.createElement('nav');
      nav.className = 'mobile-nav';
      nav.setAttribute('aria-label', 'Mobile navigation');
      
      // Clone navigation links from desktop
      const links = document.querySelector('.navlinks').cloneNode(true);
      nav.appendChild(links);
      
      document.body.appendChild(nav);
      
      // Add click handler to close menu when a link is clicked
      nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          document.body.classList.remove('menu-open');
          menuToggle.setAttribute('aria-expanded', 'false');
          
          const spans = menuToggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        });
      });
    }
  }
  
  if (window.innerWidth <= 768) {
    setupMobileNav();
  }

  // Setup on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      setupMobileNav();
    }
  });
});
