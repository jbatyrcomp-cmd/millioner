/**
 * Prize Bank Cheque Generator for "Millioner: ATT Talabalari Maxsus"
 * Generates an authentic TV Game Show Winner's Bank Cheque (Yutuq Cheki).
 */

function uzbekAmountToWords(amount) {
    if (!amount || amount === 0) return "Nol so'm 00 tiyin";
    const units = ["", "bir", "ikki", "uch", "to'rt", "besh", "olti", "yetti", "sakkiz", "to'qqiz"];
    const tens = ["", "o'n", "yigirma", "o'ttiz", "qirq", "ellik", "oltmish", "yetmish", "sakson", "to'qson"];
    
    function convertBelowThousand(n) {
        let str = "";
        const h = Math.floor(n / 100);
        const rem = n % 100;
        const t = Math.floor(rem / 10);
        const u = rem % 10;
        
        if (h > 0) str += (h === 1 ? "bir yuz" : units[h] + " yuz") + " ";
        if (t > 0) str += tens[t] + " ";
        if (u > 0) str += units[u] + " ";
        return str.trim();
    }
    
    let res = "";
    const billions = Math.floor(amount / 1000000000);
    const millions = Math.floor((amount % 1000000000) / 1000000);
    const thousands = Math.floor((amount % 1000000) / 1000);
    const remainder = amount % 1000;
    
    if (billions > 0) res += convertBelowThousand(billions) + " milliard ";
    if (millions > 0) res += convertBelowThousand(millions) + " million ";
    if (thousands > 0) res += convertBelowThousand(thousands) + " ming ";
    if (remainder > 0) res += convertBelowThousand(remainder) + " ";
    
    res = res.trim();
    return res.charAt(0).toUpperCase() + res.slice(1) + " so'm 00 tiyin";
}

class CertificateManager {
    constructor() {
        this.currentCheckData = null;
        window.addEventListener('resize', () => {
            this.fitChequeToScreen();
        });
    }

    fitChequeToScreen() {
        requestAnimationFrame(() => {
            const wrapper = document.querySelector('.prize-check-wrapper');
            const card = document.querySelector('.prize-check-card');
            if (!wrapper || !card) return;

            const container = wrapper.parentElement || wrapper;
            const containerWidth = container.clientWidth;
            const baseWidth = 700; // Landscape album width

            if (containerWidth > 0 && containerWidth < baseWidth) {
                const scale = Math.min(1, Math.max(0.35, (containerWidth - 6) / baseWidth));
                card.style.transform = `scale(${scale})`;
                card.style.transformOrigin = 'top center';
                const scaledHeight = Math.ceil(card.offsetHeight * scale);
                if (scaledHeight > 0) {
                    wrapper.style.height = `${scaledHeight + 4}px`;
                }
                wrapper.style.overflow = 'hidden';
            } else {
                card.style.transform = 'none';
                wrapper.style.height = 'auto';
                wrapper.style.overflow = 'visible';
            }
        });
    }

    getCategoryTitle(level, prizeAmount) {
        if (level >= 15) {
            return {
                title: "ATT OLIY TOIFA MAGNAT / TOP BITIRUVCHI",
                badge: "CHIEF ARCHITECT / CTO DARAJASI",
                color: "#ffd700",
                score: "100 Ball (Maksimal)",
                description: "Chiziqli algebra, diskret tuzilmalar, tarmoqlar, ma'lumotlar bazasi va elektronika fanlari bo'yicha mukammal bilim."
            };
        } else if (level >= 10) {
            return {
                title: "ATT BOSH MUHANDIS / SENIOR TALABA",
                badge: "BOSH MUHANDIS DARAJASI",
                color: "#00d4ff",
                score: `${Math.round(75 + (level - 10) * 4)} Ball`,
                description: "Chuqurlashtirilgan IT va telekommunikatsiya arxitekturasi bo'yicha a'lo natija."
            };
        } else if (level >= 5) {
            return {
                title: "ATT SERTIFIKATLANGAN MUTAXASSIS",
                badge: "MIDDLE MUTAXASSIS",
                color: "#4ade80",
                score: `${Math.round(55 + (level - 5) * 4)} Ball`,
                description: "Asosiy nazariy va amaliy IT standartlari bo'yicha muvaffaqiyatli sinov."
            };
        } else {
            return {
                title: "ATT BOSHLANG'ICH BOSQICH TALABASI",
                badge: "JUNIOR TALABA",
                color: "#cbd5e1",
                score: `${Math.round(level * 10)} Ball`,
                description: "Boshlang'ich fundamental tushunchalar bo'yicha ishtirokchi ko'rsatkichi."
            };
        }
    }

    generateCertData(level, prizeAmount, studentName = "Azizbek Rahimov", facultyName = "TATU - ATT Fakulteti, 310-guruh", subjectName = "Barcha Fanlar (Aralash)") {
        const checkNo = `CHEK № ${Math.floor(10000000 + Math.random() * 90000000)}`;
        const dateStr = new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' });
        const rank = this.getCategoryTitle(level, prizeAmount);
        const amountInWords = uzbekAmountToWords(prizeAmount || 0);

        this.currentCheckData = {
            checkNo,
            dateStr,
            studentName: studentName.trim() || "Muhtaram Talaba",
            facultyName: facultyName.trim() || "Axborot Texnologiyalari va Telekommunikatsiya",
            subjectName: subjectName.trim() || "ATT Mutaxassislik Fanlari",
            rank,
            level,
            prizeAmount: prizeAmount || 0,
            prizeFormatted: (prizeAmount || 0).toLocaleString('uz-UZ') + " SO'M",
            amountInWords
        };

        return this.currentCheckData;
    }

    renderCertificateHTML(data) {
        return `
            <div class="prize-check-wrapper" id="printable-certificate">
                <div class="prize-check-card">
                    <!-- Security Guilloche Pattern Background -->
                    <div class="check-watermark">ATT BANK</div>

                    <!-- Top Row: Bank Details & Cheque Info -->
                    <div class="check-top-bar">
                        <div class="check-bank-identity">
                            <img src="assets/att-logo.png" alt="ATT Bank Logo" class="check-bank-logo">
                            <div class="check-bank-names">
                                <h2>MILLIONER MILLIY TELE-BANKI</h2>
                                <span>ATT TALABALARI INTELLEKTUAL JAMG'ARMASI</span>
                            </div>
                        </div>

                        <div class="check-meta-info">
                            <div class="check-number">${data.checkNo}</div>
                            <div class="check-date-box">
                                <span class="meta-label">Sana / Date:</span>
                                <span class="meta-value">${data.dateStr}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Middle Row: Pay to the Order of & Amount Box -->
                    <div class="check-middle-row">
                        <div class="check-payee-section">
                            <div class="check-line-label">TO'LANG / PAY TO THE ORDER OF:</div>
                            <div class="check-payee-name" id="cert-display-name">${data.studentName}</div>
                            <div class="check-payee-sub">${data.facultyName}</div>
                        </div>

                        <div class="check-amount-display-box">
                            <div class="check-amount-currency">UZS</div>
                            <div class="check-amount-value">${data.prizeFormatted}</div>
                        </div>
                    </div>

                    <!-- Amount in Words -->
                    <div class="check-words-row">
                        <span class="check-line-label">SUMMA SO'Z BILAN:</span>
                        <div class="check-words-text">${data.amountInWords}</div>
                    </div>

                    <!-- Bottom Row: Memo, Security Seal, Signature -->
                    <div class="check-bottom-row">
                        <div class="check-memo-section">
                            <span class="check-line-label">TO'LOV MAQSADI / FOR:</span>
                            <div class="check-memo-text">
                                <strong>${data.subjectName}</strong> — ${data.rank.badge} (${data.level}-bosqich)
                            </div>
                            <div class="check-qr-area">
                                <svg viewBox="0 0 100 100" class="check-qr-mini">
                                    <rect x="5" y="5" width="28" height="28" fill="#00d4ff"/>
                                    <rect x="10" y="10" width="18" height="18" fill="#040817"/>
                                    <rect x="14" y="14" width="10" height="10" fill="#00d4ff"/>
                                    <rect x="67" y="5" width="28" height="28" fill="#00d4ff"/>
                                    <rect x="72" y="10" width="18" height="18" fill="#040817"/>
                                    <rect x="76" y="14" width="10" height="10" fill="#00d4ff"/>
                                    <rect x="5" y="67" width="28" height="28" fill="#00d4ff"/>
                                    <rect x="10" y="72" width="18" height="18" fill="#040817"/>
                                    <rect x="14" y="76" width="10" height="10" fill="#00d4ff"/>
                                    <rect x="42" y="15" width="16" height="10" fill="#ffd700"/>
                                    <rect x="42" y="42" width="16" height="16" fill="#ffd700"/>
                                    <rect x="15" y="42" width="20" height="12" fill="#ffd700"/>
                                    <rect x="67" y="42" width="25" height="12" fill="#ffd700"/>
                                    <rect x="45" y="70" width="15" height="20" fill="#00d4ff"/>
                                    <rect x="70" y="65" width="20" height="25" fill="#00d4ff"/>
                                </svg>
                                <span>KAFOLATLANGAN TO'LOV CHEKI</span>
                            </div>
                        </div>

                        <!-- Gold Hologram Seal -->
                        <div class="check-hologram-seal">
                            <div class="holo-inner">
                                <span class="holo-star">★ ★ ★</span>
                                <span class="holo-title">ATT VERIFIED</span>
                                <span class="holo-sub">YUTUQ CHEKI</span>
                            </div>
                        </div>

                        <!-- Signature Section -->
                        <div class="check-signature-section">
                            <div class="check-sign-line"></div>
                            <span class="check-sign-label">HAKAMLAR VA TELE-LOYIHA BOSHQARUVCHISI</span>
                            <div class="check-sign-verified">Elektron Muhrlangan ✓</div>
                        </div>
                    </div>

                    <!-- Bank MICR Routing Line -->
                    <div class="check-micr-line">
                        ⑈ 1000924 ⑈  00849201 ⑈  021000089 ⑈  ${Math.floor(100000 + Math.random() * 900000)}
                    </div>
                </div>
            </div>
        `;
    }

    printCertificate() {
        window.print();
    }

    downloadAsPNG() {
        if (!this.currentCheckData) return;
        const d = this.currentCheckData;
        const width = 1200;
        const height = 620;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Background gradient
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, '#0c1735');
        grad.addColorStop(0.5, '#070d24');
        grad.addColorStop(1, '#050816');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Gold border
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 6;
        ctx.strokeRect(20, 20, width - 40, height - 40);

        ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
        ctx.lineWidth = 2;
        ctx.strokeRect(30, 30, width - 60, height - 60);

        // Watermark text
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate(-Math.PI / 14);
        ctx.font = '900 110px Montserrat, Arial, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.textAlign = 'center';
        ctx.fillText('ATT MILLIONER', 0, 0);
        ctx.restore();

        // Bank Title
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 26px Cinzel, Georgia, serif';
        ctx.textAlign = 'left';
        ctx.fillText('MILLIONER MILLIY TELE-BANKI', 150, 78);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '13px Montserrat, sans-serif';
        ctx.fillText("ATT TALABALARI INTELLEKTUAL JAMG'ARMASI", 150, 102);

        // Cheque Number & Date
        ctx.textAlign = 'right';
        ctx.fillStyle = '#00d4ff';
        ctx.font = 'bold 20px monospace';
        ctx.fillText(d.checkNo, width - 60, 75);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '14px Montserrat, sans-serif';
        ctx.fillText('Sana: ' + d.dateStr, width - 60, 102);

        // Payee Line
        ctx.textAlign = 'left';
        ctx.fillStyle = 'rgba(255, 215, 0, 0.85)';
        ctx.font = 'bold 13px Montserrat, sans-serif';
        ctx.fillText("TO'LANG / PAY TO THE ORDER OF:", 60, 175);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 34px Montserrat, sans-serif';
        ctx.fillText(d.studentName, 60, 220);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = 'italic 16px Montserrat, sans-serif';
        ctx.fillText(d.facultyName, 60, 250);

        // Amount Box
        ctx.fillStyle = 'rgba(0, 212, 255, 0.12)';
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 3;
        ctx.fillRect(width - 430, 160, 370, 78);
        ctx.strokeRect(width - 430, 160, 370, 78);

        ctx.fillStyle = '#00d4ff';
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('UZS', width - 415, 210);

        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 28px Montserrat, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(d.prizeFormatted, width - 80, 210);

        // Amount in words
        ctx.fillStyle = 'rgba(255, 215, 0, 0.85)';
        ctx.font = 'bold 13px Montserrat, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText("SUMMA SO'Z BILAN:", 60, 310);

        ctx.fillStyle = '#00d4ff';
        ctx.font = 'bold italic 20px Montserrat, sans-serif';
        ctx.fillText(d.amountInWords, 60, 340);

        // Memo
        ctx.fillStyle = 'rgba(255, 215, 0, 0.85)';
        ctx.font = 'bold 13px Montserrat, sans-serif';
        ctx.fillText("TO'LOV MAQSADI / FOR:", 60, 410);

        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Montserrat, sans-serif';
        ctx.fillText(d.subjectName + ' — ' + d.rank.badge + ' (' + d.level + '-bosqich)', 60, 438);

        // Verified Stamp Box
        ctx.fillStyle = 'rgba(34, 197, 94, 0.15)';
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        ctx.fillRect(width - 330, 380, 270, 72);
        ctx.strokeRect(width - 330, 380, 270, 72);

        ctx.fillStyle = '#22c55e';
        ctx.font = 'bold 15px Montserrat, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('ELEKTRON TASDIQLANGAN ✓', width - 195, 413);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '11px Montserrat, sans-serif';
        ctx.fillText("ATT OLIY HAKAMLAR HAY'ATI", width - 195, 435);

        // MICR Routing Line
        ctx.textAlign = 'center';
        ctx.fillStyle = '#00d4ff';
        ctx.font = '16px monospace';
        ctx.fillText('⑈ 1000924 ⑈  00849201 ⑈  021000089 ⑈  749214', width / 2, 565);

        // Logo Image
        const logo = new Image();
        logo.crossOrigin = 'anonymous';
        logo.onload = () => {
            try {
                ctx.drawImage(logo, 55, 45, 80, 80);
            } catch (e) {}
            this.saveCanvasAsImage(canvas);
        };
        logo.onerror = () => {
            this.saveCanvasAsImage(canvas);
        };
        logo.src = 'assets/att-logo.png';
    }

    saveCanvasAsImage(canvas) {
        try {
            const link = document.createElement('a');
            link.download = 'ATT_Millioner_Yutuq_Cheki.png';
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e) {
            console.error('Error saving cheque PNG:', e);
        }
    }
}

window.certificateManager = new CertificateManager();
