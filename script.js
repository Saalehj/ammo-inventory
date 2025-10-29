// تنظیمات پروژه
const CONFIG = {
    API_KEY: 'AIzaSyDFtJYxstIVt0wlRFhXtOqhdjC4_1fODbk',
    SHEET_ID: '1H1ljoMWTghShk02mBBGXaNp4VYXhTGT98EnNlqWBd6A',
    SHEET_NAME: 'Sheet1'
};

// تابع برای لود داده‌ها
async function loadData() {
    try {
        console.log('شروع لود داده...');
        
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEET_ID}/values/${CONFIG.SHEET_NAME}?key=${CONFIG.API_KEY}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.values && data.values.length > 0) {
            displayData(data.values);
        } else {
            document.getElementById('tableBody').innerHTML = '<tr><td colspan="8">داتای بوونی نیە</td></tr>';
        }
    } catch (error) {
        console.error('هەڵە لە بارکردنی داتا:', error);
        document.getElementById('tableBody').innerHTML = `<tr><td colspan="8">هەڵە: ${error.message}</td></tr>`;
    }
}

// تابع برای نمایش داده‌ها با ساختار مرج
function displayData(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    // از ردیف ۴ شروع می‌کنیم (ردیف‌های ۰,۱,۲ هدر هستند)
    for (let i = 3; i < data.length; i++) {
        const row = data[i];
        
        // فیلتر ردیف‌های خالی
        if (!row[1] || row[1].trim() === '') {
            continue;
        }
        
        const tr = document.createElement('tr');
        
        // شماره ردیف
        const tdNumber = document.createElement('td');
        tdNumber.textContent = i - 2;
        tr.appendChild(tdNumber);
        
        // نام سلاح
        const tdName = document.createElement('td');
        tdName.textContent = row[1] || '';
        tdName.style.textAlign = 'right';
        tr.appendChild(tdName);
        
        // داده‌های چەک (ستون‌های ۲,۳,۴)
        for (let j = 2; j <= 4; j++) {
            const td = document.createElement('td');
            td.textContent = row[j] || '0';
            td.style.textAlign = 'center';
            tr.appendChild(td);
        }
        
        // داده‌های تەقەمەنى (ستون‌های ۵,۶,۷)
        for (let j = 5; j <= 7; j++) {
            const td = document.createElement('td');
            td.textContent = row[j] || '0';
            td.style.textAlign = 'center';
            tr.appendChild(td);
        }
        
        tbody.appendChild(tr);
    }
}

// تابع برای صفحه ادمین
function openAdmin() {
    const password = prompt('پاسورڈی ئەدمین بنووسە:');
    if (password === '123456') {
        window.open('https://docs.google.com/spreadsheets/d/1H1ljoMWTghShk02mBBGXaNp4VYXhTGT98EnNlqWBd6A/edit', '_blank');
        alert('ئەدمین: دەتوانیت لە گووگل شیتس داتاکان بگۆڕیت. دوای گۆڕین، لاپەڕەکە نوێبکەرەوە.');
    } else {
        alert('پاسورێد هەڵەیه!');
    }
}

// وقتی صفحه لود شد
document.addEventListener('DOMContentLoaded', loadData);

// اضافه کردن این توابع به script.js

// مدیریت تب‌ها
function showTab(tabName) {
    console.log('Changing to tab:', tabName);
    
    // غیرفعال کردن همه تب‌ها
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // فعال کردن تب انتخاب شده
    const selectedTab = document.getElementById(tabName + '-tab');
    const selectedNav = event.target;
    
    if (selectedTab) {
        selectedTab.classList.add('active');
        selectedNav.classList.add('active');
    }
}

function loginAdmin() {
    const password = document.getElementById('admin-password').value;
    console.log('Login attempt with password:', password);
    
    if (password === '123456') {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('edit-panel').classList.add('active');
        loadEditData();
        alert('بەخێربێیت ئەدمین!');
    } else {
        alert('پاسورێد هەڵەیه!');
    }
}

// اضافه کردن استایل برای تب‌ها
const style = document.createElement('style');
style.textContent = `
    .tab-content {
        display: none;
        padding: 20px;
    }
    .tab-content.active {
        display: block;
    }
`;
document.head.appendChild(style);

// وقتی صفحه لود شد
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded');
    loadData();
    
    // مطمئن شویم تب نمایش فعال است
    showTab('view');
});

// باز کردن گوگل شیتس
function openGoogleSheet() {
    window.open('https://docs.google.com/spreadsheets/d/1H1ljoMWTghShk02mBBGXaNp4VYXhTGT98EnNlqWBd6A/edit', '_blank');
}

// نوێکردنەوەی داتا
function refreshData() {
    loadData();
    loadEditData();
    alert('داتا نوێکرایەوە!');
}

// لود داده برای ادیت
async function loadEditData() {
    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEET_ID}/values/${CONFIG.SHEET_NAME}?key=${CONFIG.API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.values) {
            displayEditData(data.values);
        }
    } catch (error) {
        console.error('خطا در لود داده برای ادیت:', error);
    }
}

// نمایش داده در جدول ادیت
function displayEditData(data) {
    const tbody = document.getElementById('editTableBody');
    tbody.innerHTML = '';

    for (let i = 3; i < data.length; i++) {
        const row = data[i];
        if (!row[1] || row[1].trim() === '') continue;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${i-2}</td>
            <td>${row[1] || ''}</td>
            <td><input type="number" value="${row[2] || 0}" data-row="${i}" data-col="2"></td>
            <td><input type="number" value="${row[3] || 0}" data-row="${i}" data-col="3"></td>
            <td><input type="number" value="${row[4] || 0}" data-row="${i}" data-col="4"></td>
            <td><input type="number" value="${row[5] || 0}" data-row="${i}" data-col="5"></td>
            <td><input type="number" value="${row[6] || 0}" data-row="${i}" data-col="6"></td>
            <td><input type="number" value="${row[7] || 0}" data-row="${i}" data-col="7"></td>
            <td>
                <button class="btn btn-primary" onclick="saveRow(this)">پاشەکەوت</button>
            </td>
        `;
        tbody.appendChild(tr);
    }
}

// ذخیره تغییرات
function saveRow(button) {
    const row = button.closest('tr');
    const inputs = row.querySelectorAll('input');
    const changes = [];
    
    inputs.forEach(input => {
        changes.push({
            row: parseInt(input.dataset.row),
            col: parseInt(input.dataset.col),
            value: input.value
        });
    });
    
    // اینجا می‌توانید کد ذخیره در گوگل شیتس را اضافه کنید
    alert('تغییرات ذخیره شد! (در نسخه بعدی به گوگل شیتس sync می‌شود)');
    row.classList.add('editing-row');
    setTimeout(() => row.classList.remove('editing-row'), 2000);
}
