// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const pageTitle = document.getElementById('page-title');
    const refreshBtn = document.querySelector('.btn-refresh');

    // Page navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the page to show
            const pageName = this.getAttribute('data-page');
            
            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));
            
            // Show the selected page
            const selectedPage = document.getElementById(`${pageName}-page`);
            if (selectedPage) {
                selectedPage.classList.add('active');
            }
            
            // Update page title
            const pageText = this.querySelector('span:not(.icon)').textContent;
            pageTitle.textContent = `${pageText}`;
        });
    });

    // Refresh button
    refreshBtn.addEventListener('click', function() {
        // Add loading animation
        this.innerHTML = '⏳ Refreshing...';
        this.disabled = true;
        
        // Simulate refresh (reload iframe on home page)
        setTimeout(() => {
            const iframe = document.querySelector('.iframe-wrapper iframe');
            if (iframe && document.getElementById('home-page').classList.contains('active')) {
                iframe.src = iframe.src;
            }
            
            this.innerHTML = '🔄 Refresh';
            this.disabled = false;
            
            // Show success message
            showNotification('Dashboard refreshed successfully!');
        }, 1000);
    });

    // Initialize charts (using canvas for demo)
    initializeCharts();

    // Add dynamic data updates
    setInterval(updateStats, 30000); // Update every 30 seconds
});

// Initialize simple chart visualizations
function initializeCharts() {
    const salesCanvas = document.getElementById('salesCanvas');
    const propertyCanvas = document.getElementById('propertyCanvas');
    
    if (salesCanvas && salesCanvas.getContext) {
        const ctx = salesCanvas.getContext('2d');
        salesCanvas.width = salesCanvas.offsetWidth;
        salesCanvas.height = 300;
        
        // Draw simple bar chart
        drawBarChart(ctx, salesCanvas.width, salesCanvas.height);
    }
    
    if (propertyCanvas && propertyCanvas.getContext) {
        const ctx = propertyCanvas.getContext('2d');
        propertyCanvas.width = propertyCanvas.offsetWidth;
        propertyCanvas.height = 300;
        
        // Draw simple pie chart
        drawPieChart(ctx, propertyCanvas.width, propertyCanvas.height);
    }
}

// Simple bar chart drawing
function drawBarChart(ctx, width, height) {
    const data = [45, 52, 38, 65, 73, 58, 69, 82, 77, 88, 92, 85];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const maxValue = Math.max(...data);
    const barWidth = width / data.length - 10;
    const padding = 40;
    
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);
    
    // Draw bars
    data.forEach((value, index) => {
        const barHeight = (value / maxValue) * (height - padding * 2);
        const x = index * (width / data.length) + 5;
        const y = height - padding - barHeight;
        
        // Gradient
        const gradient = ctx.createLinearGradient(0, y, 0, height - padding);
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(1, '#1d4ed8');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Labels
        ctx.fillStyle = '#64748b';
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(labels[index], x + barWidth / 2, height - 20);
        
        // Values
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 11px Arial';
        ctx.fillText(value + 'M', x + barWidth / 2, y - 5);
    });
}

// Simple pie chart drawing
function drawPieChart(ctx, width, height) {
    const data = [
        { label: 'Houses', value: 45, color: '#3b82f6' },
        { label: 'Condos', value: 25, color: '#10b981' },
        { label: 'Townhouses', value: 20, color: '#f59e0b' },
        { label: 'Land', value: 10, color: '#ef4444' }
    ];
    
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;
    
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);
    
    let currentAngle = -Math.PI / 2;
    
    data.forEach((item, index) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        
        // Draw slice
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();
        
        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.value + '%', labelX, labelY);
        
        // Legend
        const legendX = width - 120;
        const legendY = 30 + index * 30;
        ctx.fillStyle = item.color;
        ctx.fillRect(legendX, legendY, 20, 20);
        ctx.fillStyle = '#1e293b';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(item.label, legendX + 25, legendY + 15);
        
        currentAngle += sliceAngle;
    });
}

// Update statistics dynamically
function updateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const currentValue = stat.textContent;
        // Add subtle animation effect
        stat.style.transform = 'scale(1.05)';
        setTimeout(() => {
            stat.style.transform = 'scale(1)';
        }, 200);
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .stat-value {
        transition: transform 0.2s ease;
    }
`;
document.head.appendChild(style);

// Handle window resize for charts
window.addEventListener('resize', function() {
    initializeCharts();
});

// Print functionality
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
});
