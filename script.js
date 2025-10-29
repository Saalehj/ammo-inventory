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

// تابع برای نمایش داده‌ها در جدول با فیلتر ردیف‌های خالی
function displayData(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    let rowCount = 0;

    // از ردیف ۱ شروع می‌کنیم (ردیف ۰ هدر است)
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        
        // 🔥 فیلتر ردیف‌های خالی: اگر ستون B (ایندکس 1) خالی بود، این ردیف رو نمایش نده
        if (!row[1] || row[1].trim() === '') {
            continue; // این ردیف رو نادیده بگیر
        }
        
        const tr = document.createElement('tr');
        
        // شماره ردیف
        const tdNumber = document.createElement('td');
        tdNumber.textContent = ++rowCount;
        tr.appendChild(tdNumber);
        
        // بقیه سلول‌ها
        for (let j = 1; j < 8; j++) {
            const td = document.createElement('td');
            // اگر داده نداره، 0 نمایش بده
            td.textContent = row[j] || (j >= 2 ? '0' : '');
            tr.appendChild(td);
        }
        
        tbody.appendChild(tr);
    }
    
    if (rowCount === 0) {
        tbody.innerHTML = '<tr><td colspan="8">هیچ داتایەک نەدۆزرایەوە</td></tr>';
    }
    
    console.log(`تعداد ردیف‌های نمایش داده شده: ${rowCount}`);
}

// تابع برای صفحه ادمین
function openAdmin() {
    const password = prompt('پاسورڈی ئەدمین بنووسە:');
    if (password === '123456') {
        // باز کردن گوگل شیتس برای ادیت
        window.open('https://docs.google.com/spreadsheets/d/1H1ljoMWTghShk02mBBGXaNp4VYXhTGT98EnNlqWBd6A/edit', '_blank');
        alert('ئەدمین: دەتوانیت لە گووگل شیتس داتاکان بگۆڕیت. دوای گۆڕین، لاپەڕەکە نوێبکەرەوە.');
    } else {
        alert('پاسورێد هەڵەیه!');
    }
}

// وقتی صفحه لود شد
document.addEventListener('DOMContentLoaded', loadData);
