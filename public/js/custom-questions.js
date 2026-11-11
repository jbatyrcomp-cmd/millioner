/**
 * Custom Question Manager for "Millioner: Attestatsiya Maxsus"
 * Allows teachers to add their own subject questions, import/export JSON test banks.
 */

class CustomQuestionsManager {
    constructor() {
        this.storageKey = 'millioner_att_custom_questions';
        this.customQuestions = this.loadFromStorage();
    }

    loadFromStorage() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error('Failed to load custom questions:', e);
            return [];
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.customQuestions));
            return true;
        } catch (e) {
            console.error('Failed to save custom questions:', e);
            return false;
        }
    }

    addQuestion(data) {
        const newQ = {
            id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            level: parseInt(data.level, 10) || 1,
            category: data.category || 'custom',
            categoryName: data.categoryName || 'Mualliflik Testi',
            image: data.image ? data.image.trim() : null,
            question: data.question.trim(),
            options: [
                data.options[0].trim(),
                data.options[1].trim(),
                data.options[2].trim(),
                data.options[3].trim()
            ],
            correct: parseInt(data.correct, 10) || 0,
            explanation: data.explanation ? data.explanation.trim() : "To'g'ri javob ko'rsatilgan mezon asosida belgilangan.",
            expertHint: data.expertHint ? data.expertHint.trim() : "Metodist ushbu savol bo'yicha to'g'ri variantga moyillik bildirdi."
        };

        this.customQuestions.push(newQ);
        this.saveToStorage();
        return newQ;
    }

    deleteQuestion(id) {
        this.customQuestions = this.customQuestions.filter(q => q.id !== id);
        this.saveToStorage();
    }

    getAllCustom() {
        return this.customQuestions;
    }

    exportJSON() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.customQuestions, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `attestatsiya_savollar_${new Date().toISOString().slice(0, 10)}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    }

    importJSON(jsonString) {
        try {
            const parsed = JSON.parse(jsonString);
            if (!Array.isArray(parsed)) {
                throw new Error("JSON fayl massiv (array) formatida bo'lishi kerak.");
            }
            let addedCount = 0;
            parsed.forEach(q => {
                if (q.question && Array.isArray(q.options) && q.options.length === 4 && typeof q.correct === 'number') {
                    this.customQuestions.push({
                        id: `imported_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
                        level: q.level || 1,
                        category: q.category || 'imported',
                        categoryName: q.categoryName || 'Yuklangan Test',
                        image: q.image ? q.image : null,
                        question: q.question,
                        options: q.options,
                        correct: q.correct,
                        explanation: q.explanation || "Izoh kiritilmagan.",
                        expertHint: q.expertHint || "Ekspert ushbu variantni tavsiya qiladi."
                    });
                    addedCount++;
                }
            });
            this.saveToStorage();
            return { success: true, count: addedCount };
        } catch (e) {
            return { success: false, error: e.message };
        }
    }

    clearAllCustom() {
        this.customQuestions = [];
        this.saveToStorage();
    }
}

window.customQuestionsManager = new CustomQuestionsManager();

