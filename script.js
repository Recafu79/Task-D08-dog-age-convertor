// DOM Elements
const yearSelect = document.getElementById("year");
const monthSelect = document.getElementById("month");
const daySelect = document.getElementById("day");

// 生成年份：1990 ~ 今年
const currentYear = new Date().getFullYear();
for (let y = currentYear; y >= 1990; y--) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
}

// 生成月份
for (let m = 1; m <= 12; m++) {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m;
    monthSelect.appendChild(opt);
}

// 更新日期選單
function updateDays() {
    const year = parseInt(yearSelect.value);
    const month = parseInt(monthSelect.value);
    const daysInMonth = new Date(year, month, 0).getDate();

    daySelect.innerHTML = "";
    for (let d = 1; d <= daysInMonth; d++) {
        const opt = document.createElement("option");
        opt.value = d;
        opt.textContent = d;
        daySelect.appendChild(opt);
    }
}

monthSelect.addEventListener("change", updateDays);
yearSelect.addEventListener("change", updateDays);
updateDays(); // 初次產生日期

// ★ AKC 人狗年齡換算 ★
// 第一年：15 人類歲
// 第二年：+9（=24）
// 第三年後：每年 +5
function dogToHumanYears(dogAge) {
    if (dogAge <= 0) return 0;
    if (dogAge === 1) return 15;
    if (dogAge === 2) return 24;
    return 24 + (dogAge - 2) * 5;
}

// 計算按鈕事件
document.getElementById("calcBtn").addEventListener("click", function () {
    const y = parseInt(yearSelect.value);
    const m = parseInt(monthSelect.value);
    const d = parseInt(daySelect.value);

    const birthDate = new Date(y, m - 1, d);
    const today = new Date();

    if (birthDate > today) {
        document.getElementById("result").textContent = "❗ 出生日期不能在未來";
        return;
    }

    const diffMs = today - birthDate;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    const dogAge = +(diffDays / 365.25).toFixed(2);

    const humanAge =
        dogToHumanYears(Math.floor(dogAge)) +
        (dogAge % 1) * 5;

    const resultHTML = `
        🐕 狗狗實際年齡：約 <b>${dogAge.toFixed(1)}</b> 歲<br>
        👨‍🦳 等同人類年齡：約 <b>${humanAge.toFixed(1)}</b> 歲
    `;

    document.getElementById("result").innerHTML = resultHTML;

    // 🔥 新增：儲存到 localStorage
    localStorage.setItem("dogCalcResult", resultHTML);
    localStorage.setItem("dogBirth", JSON.stringify({ y, m, d }));
});

// 🔥 新增：網頁載入時顯示上次計算結果
window.addEventListener("load", function () {
    const savedResult = localStorage.getItem("dogCalcResult");
    const savedBirth = localStorage.getItem("dogBirth");

    if (savedResult && savedBirth) {
        document.getElementById("result").innerHTML = savedResult;

        const birth = JSON.parse(savedBirth);
        yearSelect.value = birth.y;
        monthSelect.value = birth.m;

        updateDays(); // 重新生成正確的日數
        daySelect.value = birth.d;
    }
});
