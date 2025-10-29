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
