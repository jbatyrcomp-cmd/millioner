/**
 * Game Engine for "Millioner: ATT Talabalari Maxsus"
 * Fanlar: Chiziqli algebra, Diskret tuzilmalar, Kompyuter tarmoqlari, Ma'lumotlar bazasi, Elektronika va sxemalar.
 */

class MillionaireGame {
    constructor() {
        this.questions = [];
        this.currentIndex = 0;
        this.currentQuestion = null;
        this.status = 'idle'; // 'idle', 'playing', 'locked', 'ended'
        this.selectedSubject = 'all'; // 'all', 'algebra', 'discrete', 'networks', 'database', 'electronics'
        
        this.lifelines = {
            fiftyFifty: true,
            audience: true,
            phone: true,
            switchQuestion: true
        };

        this.disabledOptions = [];
        this.timerSeconds = 30;
        this.timerRemaining = 30;
        this.timerInterval = null;
        this.timerEnabled = true;

        this.history = []; // Tracking questions for analysis
        this.studentName = "Azizbek Rahimov";
        this.facultyName = "TATU - ATT Fakulteti, 310-guruh";

        this.initDOM();
        this.attachEventListeners();
        this.attachKeyboardShortcuts();
    }

    initDOM() {
        // Screens
        this.welcomeScreen = document.getElementById('welcome-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.gameOverModal = document.getElementById('game-over-modal');
        this.reviewModal = document.getElementById('review-modal');
        this.certModal = document.getElementById('cert-modal');
        this.audienceModal = document.getElementById('audience-modal');
        this.phoneModal = document.getElementById('phone-modal');
        this.customModal = document.getElementById('custom-modal');
        this.settingsModal = document.getElementById('settings-modal');

        // Game Elements
        this.questionText = document.getElementById('question-text');
        this.questionCategory = document.getElementById('question-category');
        this.questionNumber = document.getElementById('question-number');
        this.optionButtons = [
            document.getElementById('opt-0'),
            document.getElementById('opt-1'),
            document.getElementById('opt-2'),
            document.getElementById('opt-3')
        ];
        this.timerDisplay = document.getElementById('timer-display');
        this.timerRing = document.getElementById('timer-ring');
        this.ladderContainer = document.getElementById('ladder-list');
        this.currentPrizeDisplay = document.getElementById('current-prize');
        this.guaranteedPrizeDisplay = document.getElementById('guaranteed-prize');

        // Lifeline Buttons
        this.btnFifty = document.getElementById('btn-fifty');
        this.btnAudience = document.getElementById('btn-audience');
        this.btnPhone = document.getElementById('btn-phone');
        this.btnSwitch = document.getElementById('btn-switch');
        this.btnWalkAway = document.getElementById('btn-walkaway');

        // Render Ladder
        this.renderLadder();
    }

    attachEventListeners() {
        // Subject card selection
        document.querySelectorAll('.subject-pill').forEach(pill => {
            pill.addEventListener('click', (e) => {
                document.querySelectorAll('.subject-pill').forEach(p => p.classList.remove('active'));
                const target = e.currentTarget;
                target.classList.add('active');
                this.selectedSubject = target.getAttribute('data-subject') || 'all';
            });
        });

        // Start game button
        document.getElementById('btn-start-game').addEventListener('click', () => {
            window.soundManager.init();
            this.startNewGame();
        });

        // Option selections
        this.optionButtons.forEach((btn, idx) => {
            btn.addEventListener('click', () => this.handleOptionClick(idx));
        });

        // Lifelines
        this.btnFifty.addEventListener('click', () => this.useFiftyFifty());
        this.btnAudience.addEventListener('click', () => this.useAudience());
        this.btnPhone.addEventListener('click', () => this.usePhone());
        this.btnSwitch.addEventListener('click', () => this.useSwitchQuestion());
        this.btnWalkAway.addEventListener('click', () => this.walkAway());

        // Audio toggle
        const soundBtn = document.getElementById('btn-sound-toggle');
        soundBtn.addEventListener('click', () => {
            const enabled = window.soundManager.toggleSound();
            soundBtn.classList.toggle('muted', !enabled);
            const icon = soundBtn.querySelector('span');
            if (icon) icon.textContent = enabled ? '🔊' : '🔇';
        });

        // Timer toggle in settings
        const timerToggle = document.getElementById('timer-toggle-cb');
        if (timerToggle) {
            timerToggle.addEventListener('change', (e) => {
                this.timerEnabled = e.target.checked;
            });
        }

        // Modals close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal-overlay');
                if (modal) modal.classList.remove('active');
            });
        });

        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) overlay.classList.remove('active');
            });
        });

        // Diagram Lightbox Click
        const mediaWrap = document.getElementById('question-media');
        if (mediaWrap) {
            mediaWrap.addEventListener('click', (e) => {
                const img = e.target.closest('img');
                if (img) this.openDiagramLightbox(img.src);
            });
        }

        // Review button
        document.getElementById('btn-show-review').addEventListener('click', () => {
            this.showReviewModal();
        });

        // Certificate button
        document.getElementById('btn-show-cert').addEventListener('click', () => {
            this.showCertificateModal();
        });

        // Play again buttons
        document.querySelectorAll('.btn-restart-game').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
                this.startNewGame();
            });
        });

        // Back to home / welcome button
        const homeBtns = document.querySelectorAll('.btn-go-home');
        homeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.stopTimer();
                window.soundManager.stopAmbient();
                document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
                this.gameScreen.classList.remove('active');
                this.welcomeScreen.classList.add('active');
            });
        });

        // Mobile toggle ladder button
        const btnToggleLadder = document.getElementById('btn-toggle-ladder');
        if (btnToggleLadder) {
            btnToggleLadder.addEventListener('click', () => {
                const sidebar = document.querySelector('.ladder-sidebar');
                if (sidebar) {
                    sidebar.classList.toggle('mobile-open');
                }
            });
        }

        const btnCloseLadder = document.getElementById('btn-close-ladder');
        if (btnCloseLadder) {
            btnCloseLadder.addEventListener('click', () => {
                const sidebar = document.querySelector('.ladder-sidebar');
                if (sidebar) {
                    sidebar.classList.remove('mobile-open');
                }
            });
        }

        // Leaderboard modal button
        const btnLeader = document.getElementById('btn-open-leaderboard');
        if (btnLeader) {
            btnLeader.addEventListener('click', () => {
                this.showLeaderboardModal();
            });
        }
        const btnClearLeader = document.getElementById('btn-clear-leaderboard');
        if (btnClearLeader) {
            btnClearLeader.addEventListener('click', () => {
                if (confirm("Haqiqatan ham reyting tarixini tozalashni xohlaysizmi?")) {
                    window.leaderboardManager.clearScores();
                    document.getElementById('leaderboard-content-area').innerHTML = window.leaderboardManager.renderTableHTML();
                }
            });
        }

        // Custom question manager modal button
        const btnCustom = document.getElementById('btn-open-custom-modal');
        if (btnCustom) {
            btnCustom.addEventListener('click', () => {
                this.showCustomQuestionsModal();
            });
        }

        // Settings modal button
        const btnSettings = document.getElementById('btn-open-settings');
        if (btnSettings) {
            btnSettings.addEventListener('click', () => {
                this.showSettingsModal();
            });
        }

        // Settings modal controls
        const settingSoundToggle = document.getElementById('settings-sound-toggle');
        if (settingSoundToggle) {
            settingSoundToggle.addEventListener('change', (e) => {
                if (window.soundManager.enabled !== e.target.checked) {
                    window.soundManager.toggleSound();
                    const soundBtn = document.getElementById('btn-sound-toggle');
                    if (soundBtn) {
                        soundBtn.classList.toggle('muted', !window.soundManager.enabled);
                        const icon = soundBtn.querySelector('span');
                        if (icon) icon.textContent = window.soundManager.enabled ? '🔊' : '🔇';
                    }
                }
            });
        }

        const settingTimerSelect = document.getElementById('settings-timer-select');
        if (settingTimerSelect) {
            settingTimerSelect.addEventListener('change', (e) => {
                const val = parseInt(e.target.value, 10);
                if (val === 0) {
                    this.timerEnabled = false;
                    const timerToggle = document.getElementById('timer-toggle-cb');
                    if (timerToggle) timerToggle.checked = false;
                } else {
                    this.timerEnabled = true;
                    this.timerSeconds = val;
                    const timerToggle = document.getElementById('timer-toggle-cb');
                    if (timerToggle) timerToggle.checked = true;
                }
            });
        }

        const settingBlurSelect = document.getElementById('settings-blur-select');
        if (settingBlurSelect) {
            settingBlurSelect.addEventListener('change', (e) => {
                document.body.classList.remove('blur-subtle', 'blur-medium', 'blur-deep');
                document.body.classList.add('blur-' + e.target.value);
            });
        }

        const settingAnimSelect = document.getElementById('settings-anim-select');
        if (settingAnimSelect) {
            settingAnimSelect.addEventListener('change', (e) => {
                document.documentElement.setAttribute('data-anim-speed', e.target.value);
            });
        }

        // Add custom question form submit
        const addQForm = document.getElementById('form-add-question');
        if (addQForm) {
            addQForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSaveCustomQuestion(e);
            });
        }

        // Export/Import custom test
        document.getElementById('btn-export-tests').addEventListener('click', () => {
            window.customQuestionsManager.exportJSON();
        });

        const fileInput = document.getElementById('input-import-tests');
        document.getElementById('btn-import-tests').addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                const res = window.customQuestionsManager.importJSON(event.target.result);
                if (res.success) {
                    alert(`${res.count} ta savol muvaffaqiyatli yuklandi!`);
                    this.renderCustomQuestionList();
                } else {
                    alert("Xatolik: " + res.error);
                }
            };
            reader.readAsText(file);
            fileInput.value = '';
        });

        // Print certificate button
        document.getElementById('btn-print-cert').addEventListener('click', () => {
            window.certificateManager.printCertificate();
        });

        // Download certificate as PNG button
        const btnDownloadPNG = document.getElementById('btn-download-png');
        if (btnDownloadPNG) {
            btnDownloadPNG.addEventListener('click', () => {
                window.certificateManager.downloadAsPNG();
            });
        }

        // Telegram share buttons
        const handleShareTelegram = () => {
            const finalPrize = this.getGuaranteedPrize() || this.getCurrentPrize();
            const prizeStr = finalPrize.toLocaleString('uz-UZ') + " so'm";
            const subjName = ATT_SUBJECTS[this.selectedSubject] ? ATT_SUBJECTS[this.selectedSubject].name : "Barcha fanlar";
            const shareText = `🎓 Men "ATT Millioner" intellektual tele-o'yinida ${prizeStr} yutib oldim!\n📚 Fan: ${subjName}\nSiz ham o'z bilimingizni sinab ko'ring!`;
            const shareUrl = encodeURIComponent(window.location.href);
            window.open(`https://t.me/share/url?url=${shareUrl}&text=${encodeURIComponent(shareText)}`, '_blank');
        };

        const btnShareCertTg = document.getElementById('btn-share-telegram');
        if (btnShareCertTg) btnShareCertTg.addEventListener('click', handleShareTelegram);

        const btnGameOverTg = document.getElementById('btn-gameover-tg');
        if (btnGameOverTg) btnGameOverTg.addEventListener('click', handleShareTelegram);

        // Update certificate name dynamically
        const certNameInput = document.getElementById('cert-input-name');
        const certOrgInput = document.getElementById('cert-input-org');
        if (certNameInput && certOrgInput) {
            const updateCert = () => {
                this.studentName = certNameInput.value;
                this.facultyName = certOrgInput.value;
                const lastLevel = this.currentIndex + 1;
                const prize = this.getCurrentPrize();
                const subjInfo = ATT_SUBJECTS[this.selectedSubject] ? ATT_SUBJECTS[this.selectedSubject].name : "ATT Mutaxassislik Fanlari";
                const certData = window.certificateManager.generateCertData(lastLevel, prize, this.studentName, this.facultyName, subjInfo);
                document.getElementById('certificate-render-area').innerHTML = window.certificateManager.renderCertificateHTML(certData);
                window.certificateManager.fitChequeToScreen();
            };
            certNameInput.addEventListener('input', updateCert);
            certOrgInput.addEventListener('input', updateCert);
        }
    }

    attachKeyboardShortcuts() {
        window.addEventListener('keydown', (e) => {
            if (this.status !== 'playing') {
                if (e.key === 'Escape') {
                    document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
                }
                return;
            }

            const key = e.key.toUpperCase();
            if (key === 'A') this.handleOptionClick(0);
            else if (key === 'B') this.handleOptionClick(1);
            else if (key === 'C') this.handleOptionClick(2);
            else if (key === 'D') this.handleOptionClick(3);
            else if (key === '1') this.useFiftyFifty();
            else if (key === '2') this.useAudience();
            else if (key === '3') this.usePhone();
            else if (key === '4') this.useSwitchQuestion();
        });
    }

    renderLadder() {
        this.ladderContainer.innerHTML = '';
        for (let i = PRIZE_LADDER.length - 1; i >= 0; i--) {
            const item = PRIZE_LADDER[i];
            const div = document.createElement('div');
            div.className = `ladder-step ${item.guaranteed ? 'guaranteed' : ''}`;
            div.id = `ladder-step-${item.level}`;

            div.innerHTML = `
                <span class="ladder-num">${item.level}</span>
                <span class="ladder-marker">◆</span>
                <span class="ladder-tier">${item.tier}</span>
                <span class="ladder-val">${item.formatted}</span>
            `;
            this.ladderContainer.appendChild(div);
        }
    }

    updateLadderHighlight() {
        document.querySelectorAll('.ladder-step').forEach(s => s.classList.remove('active', 'completed'));
        for (let lvl = 1; lvl < this.currentIndex + 1; lvl++) {
            const stepEl = document.getElementById(`ladder-step-${lvl}`);
            if (stepEl) stepEl.classList.add('completed');
        }
        const currentStepEl = document.getElementById(`ladder-step-${this.currentIndex + 1}`);
        if (currentStepEl) {
            currentStepEl.classList.add('active');
            currentStepEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    startNewGame() {
        const customQ = window.customQuestionsManager.getAllCustom();
        this.questions = generateGameQuestions(this.selectedSubject, customQ);
        this.currentIndex = 0;
        this.status = 'playing';
        this.history = [];
        this.disabledOptions = [];

        // Reset lifelines
        this.lifelines = {
            fiftyFifty: true,
            audience: true,
            phone: true,
            switchQuestion: true
        };
        this.updateLifelineUI();

        // Switch screen
        this.welcomeScreen.classList.remove('active');
        this.gameScreen.classList.add('active');

        // Start ambient sound
        window.soundManager.startAmbient(1);

        // Load Question 1
        this.loadCurrentQuestion();
    }

    updateLifelineUI() {
        this.btnFifty.disabled = !this.lifelines.fiftyFifty;
        this.btnAudience.disabled = !this.lifelines.audience;
        this.btnPhone.disabled = !this.lifelines.phone;
        this.btnSwitch.disabled = !this.lifelines.switchQuestion;

        this.btnFifty.classList.toggle('used', !this.lifelines.fiftyFifty);
        this.btnAudience.classList.toggle('used', !this.lifelines.audience);
        this.btnPhone.classList.toggle('used', !this.lifelines.phone);
        this.btnSwitch.classList.toggle('used', !this.lifelines.switchQuestion);
    }

    getCurrentPrize() {
        if (this.currentIndex === 0) return 0;
        return PRIZE_LADDER[this.currentIndex - 1].amount;
    }

    getGuaranteedPrize() {
        if (this.currentIndex >= 10) return 100000000; // 10-level guaranteed (100 mln)
        if (this.currentIndex >= 5) return 5000000;    // 5-level guaranteed (5 mln)
        return 0;
    }

    loadCurrentQuestion() {
        this.currentQuestion = this.questions[this.currentIndex];
        this.disabledOptions = [];
        this.status = 'playing';

        // Update displays
        this.questionNumber.textContent = `${this.currentIndex + 1}-SAVOL (Jami 15)`;
        this.questionCategory.textContent = this.currentQuestion.categoryName || "ATT Mutaxassislik Fani";
        this.questionText.textContent = this.currentQuestion.question;

        // Media / Diagram handling
        const mediaWrap = document.getElementById('question-media');
        if (mediaWrap) {
            if (this.currentQuestion.image) {
                mediaWrap.innerHTML = `<img src="${this.currentQuestion.image}" alt="Savol diagrammasi" class="question-diagram-img">`;
                mediaWrap.style.display = 'flex';
            } else {
                mediaWrap.innerHTML = '';
                mediaWrap.style.display = 'none';
            }
        }

        // Trigger smooth question enter animation
        const qBox = document.querySelector('.question-box');
        if (qBox) {
            qBox.classList.remove('question-anim-enter');
            void qBox.offsetWidth; // Reflow to replay animation smoothly
            qBox.classList.add('question-anim-enter');
        }

        // Reset and populate options with staggered cascade animations
        const letters = ['A', 'B', 'C', 'D'];
        this.optionButtons.forEach((btn, idx) => {
            btn.className = 'option-btn';
            void btn.offsetWidth; // Reflow to replay cascade animation smoothly
            btn.className = `option-btn option-anim-${idx}`;
            btn.disabled = false;
            btn.innerHTML = `
                <span class="opt-diamond">◆</span>
                <span class="opt-letter">${letters[idx]}:</span>
                <span class="opt-text">${this.currentQuestion.options[idx]}</span>
                <span class="opt-keycap desktop-only">${letters[idx]}</span>
            `;
        });

        // Update header badges
        const curPrize = this.getCurrentPrize();
        const guarPrize = this.getGuaranteedPrize();
        this.currentPrizeDisplay.textContent = curPrize.toLocaleString('uz-UZ') + " so'm";
        this.guaranteedPrizeDisplay.textContent = guarPrize.toLocaleString('uz-UZ') + " so'm";

        this.updateLadderHighlight();

        // Sound effect
        window.soundManager.playQuestionAppear();

        // Start timer
        this.startTimer();
    }

    startTimer() {
        clearInterval(this.timerInterval);
        if (!this.timerEnabled) {
            this.timerDisplay.textContent = "∞";
            return;
        }

        this.timerRemaining = this.timerSeconds;
        this.updateTimerUI();

        this.timerInterval = setInterval(() => {
            this.timerRemaining--;
            this.updateTimerUI();

            if (this.timerRemaining <= 5 && this.timerRemaining > 0) {
                window.soundManager.playTick();
            }

            if (this.timerRemaining <= 0) {
                clearInterval(this.timerInterval);
                this.handleTimeout();
            }
        }, 1000);
    }

    updateTimerUI() {
        this.timerDisplay.textContent = this.timerRemaining;
        const percent = (this.timerRemaining / this.timerSeconds) * 100;
        if (this.timerRing) {
            this.timerRing.style.strokeDashoffset = 283 - (283 * percent) / 100;
        }
        if (this.timerRemaining <= 5) {
            this.timerDisplay.classList.add('urgent');
        } else {
            this.timerDisplay.classList.remove('urgent');
        }
    }

    stopTimer() {
        clearInterval(this.timerInterval);
    }

    handleOptionClick(selectedIdx) {
        if (this.status !== 'playing') return;
        if (this.disabledOptions.includes(selectedIdx)) return;

        this.status = 'locked';
        this.stopTimer();

        // Lock sound & visual
        window.soundManager.playSelect();
        const btn = this.optionButtons[selectedIdx];
        btn.classList.add('selected');

        // Play tension sound
        window.soundManager.playSuspense();

        // Reveal answer after 2 seconds
        setTimeout(() => {
            this.revealAnswer(selectedIdx);
        }, 2000);
    }

    revealAnswer(selectedIdx) {
        const isCorrect = selectedIdx === this.currentQuestion.correct;
        const correctBtn = this.optionButtons[this.currentQuestion.correct];
        const selectedBtn = this.optionButtons[selectedIdx];

        // Record history
        this.history.push({
            level: this.currentIndex + 1,
            question: this.currentQuestion.question,
            category: this.currentQuestion.categoryName,
            image: this.currentQuestion.image || null,
            selectedOption: this.currentQuestion.options[selectedIdx],
            correctOption: this.currentQuestion.options[this.currentQuestion.correct],
            isCorrect: isCorrect,
            explanation: this.currentQuestion.explanation,
            prize: PRIZE_LADDER[this.currentIndex].formatted
        });

        if (isCorrect) {
            selectedBtn.classList.remove('selected');
            selectedBtn.classList.add('correct');
            const isMilestone = (this.currentIndex + 1 === 5) || (this.currentIndex + 1 === 10) || (this.currentIndex + 1 === 15);
            window.soundManager.playCorrect(isMilestone);

            if (isMilestone) {
                this.triggerConfetti();
                if (this.currentIndex + 1 === 5) {
                    this.showMilestoneToast("🌟 1-Kafolatlangan marra! 5,000,000 so'm (ATT Sertifikatlangan Mutaxassis) qo'lga kiritildi!");
                } else if (this.currentIndex + 1 === 10) {
                    this.showMilestoneToast("🏆 2-Kafolatlangan marra! 100,000,000 so'm (ATT Bosh Muhandis) qo'lga kiritildi!");
                }
            }

            // Check if Question 15 won!
            if (this.currentIndex === 14) {
                setTimeout(() => {
                    this.gameWin();
                }, 1500);
            } else {
                setTimeout(() => {
                    this.currentIndex++;
                    this.loadCurrentQuestion();
                }, 1600);
            }
        } else {
            selectedBtn.classList.remove('selected');
            selectedBtn.classList.add('wrong');
            correctBtn.classList.add('correct');
            window.soundManager.playWrong();

            setTimeout(() => {
                this.gameOver('wrong');
            }, 2500);
        }
    }

    handleTimeout() {
        this.status = 'ended';
        window.soundManager.playWrong();
        const correctBtn = this.optionButtons[this.currentQuestion.correct];
        correctBtn.classList.add('correct');

        this.history.push({
            level: this.currentIndex + 1,
            question: this.currentQuestion.question,
            category: this.currentQuestion.categoryName,
            image: this.currentQuestion.image || null,
            selectedOption: "Vaqt tugadi (Javob berilmadi)",
            correctOption: this.currentQuestion.options[this.currentQuestion.correct],
            isCorrect: false,
            explanation: this.currentQuestion.explanation,
            prize: PRIZE_LADDER[this.currentIndex].formatted
        });

        setTimeout(() => {
            this.gameOver('timeout');
        }, 2000);
    }

    // ---------------- LIFELINES ----------------
    useFiftyFifty() {
        if (!this.lifelines.fiftyFifty || this.status !== 'playing') return;
        this.lifelines.fiftyFifty = false;
        this.updateLifelineUI();
        window.soundManager.playLifeline();

        const correct = this.currentQuestion.correct;
        const incorrectIndices = [0, 1, 2, 3].filter(i => i !== correct);

        incorrectIndices.sort(() => Math.random() - 0.5);
        const toEliminate = incorrectIndices.slice(0, 2);

        toEliminate.forEach(idx => {
            this.disabledOptions.push(idx);
            const btn = this.optionButtons[idx];
            btn.classList.add('eliminated');
            btn.disabled = true;
        });
    }

    useAudience() {
        if (!this.lifelines.audience || this.status !== 'playing') return;
        this.lifelines.audience = false;
        this.updateLifelineUI();
        window.soundManager.playLifeline();

        const correct = this.currentQuestion.correct;
        const baseProb = Math.max(50, 85 - (this.currentIndex * 2.5));
        let remaining = 100 - baseProb;

        const percentages = [0, 0, 0, 0];
        percentages[correct] = Math.round(baseProb);

        const otherIndices = [0, 1, 2, 3].filter(i => i !== correct);
        const p1 = Math.floor(Math.random() * (remaining * 0.55));
        remaining -= p1;
        const p2 = Math.floor(Math.random() * (remaining * 0.65));
        remaining -= p2;
        const p3 = remaining;

        percentages[otherIndices[0]] = p1;
        percentages[otherIndices[1]] = p2;
        percentages[otherIndices[2]] = p3;

        const letters = ['A', 'B', 'C', 'D'];
        const chartArea = document.getElementById('audience-chart-bars');
        chartArea.innerHTML = '';

        letters.forEach((letter, i) => {
            const bar = document.createElement('div');
            bar.className = 'aud-bar-col';
            bar.innerHTML = `
                <div class="aud-bar-track">
                    <div class="aud-bar-fill" style="height: 0%;" data-height="${percentages[i]}%"></div>
                </div>
                <div class="aud-bar-label">${letter}</div>
                <div class="aud-bar-val">${percentages[i]}%</div>
            `;
            chartArea.appendChild(bar);
        });

        this.audienceModal.classList.add('active');

        setTimeout(() => {
            document.querySelectorAll('.aud-bar-fill').forEach(fill => {
                fill.style.height = fill.getAttribute('data-height');
            });
        }, 100);
    }

    usePhone() {
        if (!this.lifelines.phone || this.status !== 'playing') return;
        this.lifelines.phone = false;
        this.updateLifelineUI();
        window.soundManager.playLifeline();

        const hint = this.currentQuestion.expertHint || "Menimcha savolning muhandislik yechimi to'g'ri variantda aks etgan.";
        const fullDialogue = `Salom talaba! Bir daqiqa, savolga diqqat qilyapman... Ha, bu mavzuni chuqur tahlil qilgan edik: "${hint}"`;

        const dialogueEl = document.getElementById('phone-dialogue-text');
        dialogueEl.textContent = "...";
        this.phoneModal.classList.add('active');

        let charIdx = 0;
        if (this.phoneInterval) clearInterval(this.phoneInterval);
        this.phoneInterval = setInterval(() => {
            charIdx += 2;
            dialogueEl.textContent = fullDialogue.substring(0, charIdx);
            if (charIdx >= fullDialogue.length) {
                clearInterval(this.phoneInterval);
            }
        }, 25);
    }

    useSwitchQuestion() {
        if (!this.lifelines.switchQuestion || this.status !== 'playing') return;
        this.lifelines.switchQuestion = false;
        this.updateLifelineUI();
        window.soundManager.playLifeline();

        let replacement = null;
        if (typeof getReplacementQuestion === 'function') {
            replacement = getReplacementQuestion(this.currentQuestion, this.selectedCategory, this.questions);
        }

        if (replacement) {
            this.currentQuestion = replacement;
            this.questions[this.currentIndex] = replacement;
        } else {
            const pool = QUESTION_BANK.filter(q => q.level === (this.currentIndex + 1) && q.id !== this.currentQuestion.id);
            if (pool.length > 0) {
                this.currentQuestion = JSON.parse(JSON.stringify(pool[Math.floor(Math.random() * pool.length)]));
                if (typeof shuffleQuestion === 'function') shuffleQuestion(this.currentQuestion);
                this.questions[this.currentIndex] = this.currentQuestion;
            }
        }

        this.loadCurrentQuestion();
    }

    walkAway() {
        if (this.status !== 'playing') return;
        if (confirm("O'yinni to'xtatib, hozirgi to'plangan summani olib chiqmoqchimisiz?")) {
            this.stopTimer();
            this.gameOver('walkaway');
        }
    }

    gameOver(reason) {
        this.status = 'ended';
        this.stopTimer();
        window.soundManager.stopAmbient();

        let finalPrize = 0;
        let title = "O'YIN YAKUNLANDI";
        let message = "";

        if (reason === 'wrong' || reason === 'timeout') {
            finalPrize = this.getGuaranteedPrize();
            title = "Afsuski, xato javob!";
            message = reason === 'timeout' 
                ? "Belgilangan vaqt tugadi! Siz kafolatlangan bosqich yutug'ini qo'lga kiritdingiz."
                : "Noto'g'ri variant tanlandi. Siz kafolatlangan bosqich yutug'ini qo'lga kiritdingiz.";
        } else if (reason === 'walkaway') {
            finalPrize = this.getCurrentPrize();
            title = "O'yinni to'xtatdingiz!";
            message = "Siz to'plangan yutuqni saqlab qolgan holda o'yinni muvaffaqiyatli yakunladingiz.";
        }

        document.getElementById('modal-gameover-title').textContent = title;
        document.getElementById('modal-gameover-desc').textContent = message;
        document.getElementById('modal-final-prize').textContent = finalPrize.toLocaleString('uz-UZ') + " so'm";

        const rankInfo = window.certificateManager.getCategoryTitle(this.currentIndex + 1, finalPrize);
        document.getElementById('modal-final-rank').textContent = rankInfo.title;

        // Save to leaderboard
        if (window.leaderboardManager) {
            const subjName = ATT_SUBJECTS[this.selectedSubject] ? ATT_SUBJECTS[this.selectedSubject].name : "Barcha fanlar";
            window.leaderboardManager.addRecord(this.studentName, this.facultyName, subjName, this.currentIndex + 1, finalPrize);
        }

        this.gameOverModal.classList.add('active');
    }

    gameWin() {
        this.status = 'ended';
        this.stopTimer();
        window.soundManager.stopAmbient();
        window.soundManager.playGrandWin();

        if (typeof window.confettiManager !== 'undefined') {
            window.confettiManager.grandCelebration();
        } else {
            this.triggerConfetti();
        }

        const finalPrize = 1000000000;
        document.getElementById('modal-gameover-title').textContent = "🏆 TABRIKLAYMIZ! SIZ ATT G'OLIBISIZ!";
        document.getElementById('modal-gameover-desc').textContent = "Siz barcha 15 ta murakkab fan savollariga a'lo javob berib, 1 MILLIARD SO'M va ATT TOP BITIRUVCHI unvonini qo'lga kiritdingiz!";
        document.getElementById('modal-final-prize').textContent = "1,000,000,000 so'm";
        document.getElementById('modal-final-rank').textContent = "ATT OLIY TOIFA MAGNAT";

        // Save to leaderboard
        if (window.leaderboardManager) {
            const subjName = ATT_SUBJECTS[this.selectedSubject] ? ATT_SUBJECTS[this.selectedSubject].name : "Barcha fanlar";
            window.leaderboardManager.addRecord(this.studentName, this.facultyName, subjName, 15, finalPrize);
        }

        this.gameOverModal.classList.add('active');
    }

    showLeaderboardModal() {
        const area = document.getElementById('leaderboard-content-area');
        if (area && window.leaderboardManager) {
            area.innerHTML = window.leaderboardManager.renderTableHTML();
        }
        document.getElementById('leaderboard-modal').classList.add('active');
    }

    // ---------------- REVIEW & ANALYSIS ----------------
    showReviewModal() {
        const listContainer = document.getElementById('review-list-container');
        listContainer.innerHTML = '';

        if (this.history.length === 0) {
            listContainer.innerHTML = `<p style="text-align:center; color:#94a3b8;">Hali birorta savolga javob berilmadi.</p>`;
        } else {
            this.history.forEach((h, idx) => {
                const item = document.createElement('div');
                item.className = `review-item ${h.isCorrect ? 'review-correct' : 'review-wrong'}`;
                item.innerHTML = `
                    <div class="review-header">
                        <span class="review-num">${h.level}-savol (${h.prize})</span>
                        <span class="review-cat">${h.category}</span>
                        <span class="review-badge ${h.isCorrect ? 'badge-correct' : 'badge-wrong'}">
                            ${h.isCorrect ? "✓ To'g'ri" : "✕ Xato"}
                        </span>
                    </div>
                    ${h.image ? `<div class="review-media-wrap" style="text-align:center; margin:8px 0;"><img src="${h.image}" alt="Savol chizmasi" style="max-height:130px; max-width:100%; border-radius:8px; border:1px solid rgba(0, 212, 255, 0.35); background:#070e24; padding:6px; box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>` : ''}
                    <div class="review-question">${h.question}</div>
                    <div class="review-answers">
                        <div>Sizning javobingiz: <strong class="${h.isCorrect ? 'text-green' : 'text-red'}">${h.selectedOption}</strong></div>
                        ${!h.isCorrect ? `<div>To'g'ri javob: <strong class="text-green">${h.correctOption}</strong></div>` : ''}
                    </div>
                    <div class="review-explanation">
                        <strong>💡 Nazariy va amaliy izoh:</strong> ${h.explanation}
                    </div>
                `;
                listContainer.appendChild(item);
            });

            listContainer.querySelectorAll('.review-media-wrap img').forEach(img => {
                img.style.cursor = 'zoom-in';
                img.addEventListener('click', () => {
                    this.openDiagramLightbox(img.src);
                });
            });
        }

        this.gameOverModal.classList.remove('active');
        this.reviewModal.classList.add('active');
    }

    openDiagramLightbox(src, title = "🔍 Savol Diagrammasi (Kattalashtirilgan)") {
        const modal = document.getElementById('diagram-lightbox-modal');
        const img = document.getElementById('lightbox-img');
        const titleEl = document.getElementById('lightbox-title');
        if (!modal || !img) return;
        img.src = src;
        if (titleEl) titleEl.textContent = title;
        modal.classList.add('active');
    }

    // ---------------- CERTIFICATE ----------------
    showCertificateModal() {
        const prize = this.getCurrentPrize();
        const level = this.currentIndex + 1;
        const subjInfo = ATT_SUBJECTS[this.selectedSubject] ? ATT_SUBJECTS[this.selectedSubject].name : "Barcha Fanlar (Aralash)";
        const certData = window.certificateManager.generateCertData(level, prize, this.studentName, this.facultyName, subjInfo);

        document.getElementById('cert-input-name').value = this.studentName;
        document.getElementById('cert-input-org').value = this.facultyName;
        document.getElementById('certificate-render-area').innerHTML = window.certificateManager.renderCertificateHTML(certData);
        window.certificateManager.fitChequeToScreen();

        this.gameOverModal.classList.remove('active');
        this.reviewModal.classList.remove('active');
        this.certModal.classList.add('active');

        if (typeof window.confettiManager !== 'undefined') {
            window.confettiManager.burst();
        }
    }

    showSettingsModal() {
        if (this.settingsModal) {
            const soundCb = document.getElementById('settings-sound-toggle');
            if (soundCb && typeof window.soundManager !== 'undefined') {
                soundCb.checked = window.soundManager.enabled;
            }
            this.settingsModal.classList.add('active');
        }
    }

    // ---------------- CUSTOM QUESTIONS UI ----------------
    showCustomQuestionsModal() {
        this.renderCustomQuestionList();
        this.customModal.classList.add('active');
    }

    renderCustomQuestionList() {
        const list = window.customQuestionsManager.getAllCustom();
        const container = document.getElementById('custom-questions-list');
        const badge = document.getElementById('custom-count-badge');
        badge.textContent = `${list.length} ta savol`;

        if (list.length === 0) {
            container.innerHTML = `<p style="color:#64748b; font-size:0.9rem; text-align:center; padding:1rem;">Hozircha mualliflik savollari mavjud emas. Quyidagi forma orqali o'z savollaringizni qo'shishingiz mumkin.</p>`;
            return;
        }

        container.innerHTML = '';
        list.forEach(q => {
            const card = document.createElement('div');
            card.className = 'custom-q-card';
            card.innerHTML = `
                <div class="custom-q-meta">
                    <span>${q.level}-daraja</span>
                    <span>${q.categoryName}</span>
                    ${q.image ? `<span class="badge-img" style="color:var(--gold); font-size:0.75rem;">🖼️ Suratli</span>` : ''}
                    <button class="btn-del-custom" data-id="${q.id}">O'chirish</button>
                </div>
                ${q.image ? `<div style="text-align:center; margin:4px 0;"><img src="${q.image}" alt="Diagramma" style="max-height:65px; max-width:100%; border-radius:4px; border:1px solid rgba(0,212,255,0.3); background:#070e24; padding:2px;"></div>` : ''}
                <div class="custom-q-title">${q.question}</div>
                <div class="custom-q-options">
                    ${q.options.map((opt, i) => `<span class="${i === q.correct ? 'opt-is-correct' : ''}">${['A','B','C','D'][i]}: ${opt}</span>`).join('')}
                </div>
            `;
            container.appendChild(card);
        });

        container.querySelectorAll('.btn-del-custom').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                if (confirm("Ushbu savolni o'chirmoqchimisiz?")) {
                    window.customQuestionsManager.deleteQuestion(id);
                    this.renderCustomQuestionList();
                }
            });
        });
    }

    handleSaveCustomQuestion(e) {
        const form = e.target;
        const level = form.elements['level'].value;
        const categoryName = form.elements['categoryName'].value;
        const question = form.elements['question'].value;
        const opt0 = form.elements['opt0'].value;
        const opt1 = form.elements['opt1'].value;
        const opt2 = form.elements['opt2'].value;
        const opt3 = form.elements['opt3'].value;
        const correct = form.elements['correct'].value;
        const explanation = form.elements['explanation'].value;
        const presetImage = form.elements['presetImage'] ? form.elements['presetImage'].value : '';
        const customImage = form.elements['customImage'] ? form.elements['customImage'].value.trim() : '';
        const image = customImage || presetImage || null;

        window.customQuestionsManager.addQuestion({
            level,
            category: 'user_created',
            categoryName,
            image,
            question,
            options: [opt0, opt1, opt2, opt3],
            correct,
            explanation
        });

        form.reset();
        alert("Savol muvaffaqiyatli saqlandi va o'yin bankiga qo'shildi!");
        this.renderCustomQuestionList();
    }

    showMilestoneToast(msg) {
        const toast = document.getElementById('milestone-toast');
        const textEl = document.getElementById('milestone-toast-text');
        if (!toast || !textEl) return;
        textEl.textContent = msg;
        toast.classList.add('active');
        if (this.toastTimeout) clearTimeout(this.toastTimeout);
        this.toastTimeout = setTimeout(() => {
            toast.classList.remove('active');
        }, 4000);
    }

    // ---------------- CONFETTI CELEBRATION ----------------
    triggerConfetti() {
        if (typeof window.confettiManager !== 'undefined') {
            window.confettiManager.burst();
            return;
        }
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#ffd700', '#00d4ff', '#ff3366', '#00ff88', '#ffffff'];

        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                w: Math.random() * 10 + 5,
                h: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                vy: Math.random() * 4 + 2,
                vx: (Math.random() - 0.5) * 3,
                rot: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 8
            });
        }

        let animFrame;
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.y += p.vy;
                p.x += p.vx;
                p.rot += p.rotSpeed;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rot * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();

                if (p.y > canvas.height) {
                    p.y = -20;
                    p.x = Math.random() * canvas.width;
                }
            });
            animFrame = requestAnimationFrame(render);
        };

        render();
        setTimeout(() => {
            cancelAnimationFrame(animFrame);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 8000);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.game = new MillionaireGame();
});
