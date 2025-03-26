// Form Validation and Enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to main content
    document.querySelector('main')?.classList.add('fade-in');

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    
                    // Add error message
                    const errorMsg = field.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        const msg = document.createElement('p');
                        msg.className = 'mt-1 text-sm text-red-600 error-message';
                        msg.textContent = 'This field is required';
                        field.parentNode.appendChild(msg);
                    }
                } else {
                    field.classList.remove('border-red-500');
                    const errorMsg = field.parentNode.querySelector('.error-message');
                    if (errorMsg) errorMsg.remove();
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    });

    // Input field enhancements
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        // Clear error styling on input
        input.addEventListener('input', function() {
            this.classList.remove('border-red-500');
            const errorMsg = this.parentNode.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        });

        // Add focus animation
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('ring-2', 'ring-indigo-200');
        });

        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('ring-2', 'ring-indigo-200');
        });
    });
});

// Dynamic Table Search
function initializeTableSearch(tableId, searchInputId) {
    const searchInput = document.getElementById(searchInputId);
    const table = document.getElementById(tableId);
    
    if (searchInput && table) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = table.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
}

// Notification System
class NotificationSystem {
    static show(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg transform transition-all duration-500 translate-x-full
            ${type === 'success' ? 'bg-green-500' : 
              type === 'error' ? 'bg-red-500' : 
              type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'} text-white`;
        
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                              type === 'error' ? 'fa-exclamation-circle' : 
                              type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'} mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }
}

// Print Handler
function handlePrint(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print</title>
                    <link href="https://cdn.tailwindcss.com" rel="stylesheet">
                    <link rel="stylesheet" href="/css/style.css">
                </head>
                <body class="p-8">
                    ${element.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// Date Formatter
function formatDate(date, format = 'long') {
    const d = new Date(date);
    if (format === 'long') {
        return d.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    return d.toLocaleDateString();
}

// Currency Formatter
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Initialize Tooltips
function initializeTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', e => {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute z-10 px-2 py-1 text-sm text-white bg-gray-900 rounded-lg';
            tooltip.textContent = element.getAttribute('data-tooltip');
            tooltip.style.top = `${e.target.offsetTop - 30}px`;
            tooltip.style.left = `${e.target.offsetLeft + (e.target.offsetWidth / 2)}px`;
            document.body.appendChild(tooltip);
            
            element.addEventListener('mouseleave', () => tooltip.remove());
        });
    });
}

// Export functions for use in other files
window.NotificationSystem = NotificationSystem;
window.handlePrint = handlePrint;
window.formatDate = formatDate;
window.formatCurrency = formatCurrency;
window.toggleMobileMenu = toggleMobileMenu;
window.initializeTableSearch = initializeTableSearch;
window.initializeTooltips = initializeTooltips;