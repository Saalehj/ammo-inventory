// تنظیمات پروژه
const CONFIG = {
    API_KEY: 'AIzaSyDFtJYxstIVt0wlRFhXtOqhdjC4_1fODbk',
    SHEET_ID: '1H1ljoMWTghShk02mBBGXaNp4VYXhTGT98EnNlqWBd6A',
    SHEET_NAME: 'Sheet1'
};

// تابع برای لود داده‌ها
async function loadData() {
    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEET_ID}/values/${CONFIG.SHEET_NAME}?key=${CONFIG.API_KEY}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.values) {
            displayData(data.values);
        }
    } catch (error) {
        console.error('خطا در لود داده:', error);
        document.getElementById('tableBody').innerHTML = '<tr><td colspan="8">هەڵە لە بارکردنی داتا</td></tr>';
    }
}

// تابع برای نمایش داده‌ها در جدول
function displayData(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    // از ردیف ۱ شروع می‌کنیم (شامل هدر هم می‌شود)
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const tr = document.createElement('tr');
        
        // مطمئن می‌شویم همه سلول‌ها مقدار داشته باشند
        for (let j = 0; j < 8; j++) {
            const td = document.createElement('td');
            td.textContent = row[j] || '0';
            tr.appendChild(td);
        }
        
        tbody.appendChild(tr);
    }
}

// تابع برای صفحه ادمین
function openAdmin() {
    const password = prompt('پاسورڈی ئەدمین بنووسە:');
    if (password === '123456') { // بعداً تغییر می‌دهیم
        window.location.href = 'admin.html';
    } else {
        alert('پاسورێد هەڵەیه!');
    }
}

// وقتی صفحه لود شد
document.addEventListener('DOMContentLoaded', loadData);
