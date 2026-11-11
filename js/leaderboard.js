/**
 * Leaderboard & Statistics Manager for "Millioner: ATT Talabalari Maxsus"
 * Stores top results locally in localStorage.
 */

class LeaderboardManager {
    constructor() {
        this.storageKey = 'millioner_att_leaderboard';
        this.scores = this.loadScores();
    }

    loadScores() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Failed to load leaderboard:', e);
            return [];
        }
    }

    saveScores() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.scores));
        } catch (e) {
            console.error('Failed to save leaderboard:', e);
        }
    }

    addRecord(studentName, facultyName, subjectName, level, prizeAmount) {
        const newRecord = {
            id: Date.now(),
            studentName: studentName.trim() || "Noma'lum Talaba",
            facultyName: facultyName.trim() || "ATT Fakulteti",
            subjectName: subjectName.trim() || "Barcha fanlar",
            level: level || 1,
            prizeAmount: prizeAmount || 0,
            prizeFormatted: (prizeAmount || 0).toLocaleString('uz-UZ') + " so'm",
            dateStr: new Date().toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        };

        this.scores.push(newRecord);
        // Sort descending by prizeAmount, then by level
        this.scores.sort((a, b) => b.prizeAmount - a.prizeAmount || b.level - a.level);
        // Keep top 20
        if (this.scores.length > 20) {
            this.scores = this.scores.slice(0, 20);
        }
        this.saveScores();
        return newRecord;
    }

    getTopScores() {
        return this.scores;
    }

    clearScores() {
        this.scores = [];
        this.saveScores();
    }

    renderTableHTML() {
        if (this.scores.length === 0) {
            return `
                <div style="text-align:center; padding: 2.5rem 1rem; color: #94a3b8;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🏅</div>
                    <p>Hozircha saqlangan natijalar yo'q. Birinchi bo'lib o'yinni yakunlang!</p>
                </div>
            `;
        }

        const rows = this.scores.map((r, i) => {
            const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`;
            const isTop3 = i < 3 ? 'leader-top' : '';
            return `
                <tr class="${isTop3}">
                    <td class="col-rank">${medal}</td>
                    <td class="col-name">
                        <strong>${r.studentName}</strong>
                        <span class="sub-faculty">${r.facultyName}</span>
                    </td>
                    <td class="col-subject"><span class="badge-subject">${r.subjectName}</span></td>
                    <td class="col-level">${r.level} / 15</td>
                    <td class="col-prize">${r.prizeFormatted}</td>
                    <td class="col-date">${r.dateStr}</td>
                </tr>
            `;
        }).join('');

        return `
            <div class="leaderboard-table-responsive">
                <table class="leaderboard-table">
                    <thead>
                        <tr>
                            <th>O'rin</th>
                            <th>Talaba</th>
                            <th>Fan</th>
                            <th>Bosqich</th>
                            <th>Yutuq</th>
                            <th>Sana</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        `;
    }
}

window.leaderboardManager = new LeaderboardManager();

