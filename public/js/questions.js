/**
 * Question Bank for "Millioner: ATT Talabalari Maxsus"
 * Kengaytirilgan savollar bazasi (Jami: 370 ta professional savol, 16 ta suratli savol):
 * 1. algebra     - Chiziqli algebra
 * 2. discrete    - Diskret tuzilmalar
 * 3. networks    - Kompyuter tarmoqlari
 * 4. database    - Ma'lumotlar bazasi
 * 5. electronics - Elektronika va sxemalar
 *
 * Suratli savollar (Diagrammalar, sxemalar, topologiyalar) maxsus kiritilgan.
 * Savollar va variantlar avtomatik tarzda aralashtiriladi va sessiya davomida takrorlanmaydi.
 */

const ATT_SUBJECTS = {
    all: { id: 'all', name: "Barcha Fanlar (Aralash)", icon: "🎓" },
    algebra: { id: 'algebra', name: "Chiziqli Algebra", icon: "📐" },
    discrete: { id: 'discrete', name: "Diskret Tuzilmalar", icon: "🧩" },
    networks: { id: 'networks', name: "Kompyuter Tarmoqlari", icon: "🌐" },
    database: { id: 'database', name: "Ma'lumotlar Bazasi", icon: "🗄️" },
    electronics: { id: 'electronics', name: "Elektronika va Sxemalar", icon: "⚡" }
};

// Helper: Fisher-Yates array shuffle for question options
function shuffleQuestion(q) {
    if (!q || !Array.isArray(q.options)) return q;
    const originalOptions = [...q.options];
    const mapped = originalOptions.map((text, idx) => ({ text, isCorrect: idx === q.correct }));
    
    for (let i = mapped.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mapped[i], mapped[j]] = [mapped[j], mapped[i]];
    }
    
    q.options = mapped.map(m => m.text);
    q.correct = mapped.findIndex(m => m.isCorrect);
    return q;
}

// Anti-repeat session history manager
const SEEN_QUESTIONS_KEY = 'millioner_seen_questions_v2';

function getSeenQuestionIds() {
    try {
        const stored = sessionStorage.getItem(SEEN_QUESTIONS_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

function markQuestionsAsSeen(ids) {
    try {
        const seen = getSeenQuestionIds();
        const updated = Array.from(new Set([...seen, ...ids]));
        sessionStorage.setItem(SEEN_QUESTIONS_KEY, JSON.stringify(updated));
    } catch (e) {}
}

function clearSeenQuestions() {
    try {
        sessionStorage.removeItem(SEEN_QUESTIONS_KEY);
    } catch (e) {}
}

const QUESTION_BANK = [
    {
        id: "alg_1_1",
        level: 1,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Qatorlar va ustunlar soni o'zaro teng bo'lgan matritsa nima deb ataladi?",
        options: ["Kvadrat matritsa","Nol matritsa","Birlik matritsa","Diagonal matritsa"],
        correct: 0,
        explanation: "Satrlar soni ustunlar soniga teng bo'lgan (n x n) matritsa kvadrat matritsa deyiladi.",
        expertHint: "Satr va ustuni teng bo'lsa, bu geometriyadagi kabi kvadrat matritsadir."
    },
    {
        id: "alg_1_2",
        level: 1,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Barcha elementlari faqat nollardan iborat bo'lgan matritsa qanday ataladi?",
        options: ["Birlik matritsa","Nol matritsa","Teskari matritsa","Simmetrik matritsa"],
        correct: 1,
        explanation: "Barcha elementlari 0 ga teng bo'lgan matritsa nol matritsa deb ataladi.",
        expertHint: "Elementlari nollardan iborat bo'lsa, albatta Nol matritsa bo'ladi."
    },
    {
        id: "alg_1_3",
        level: 1,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Matritsani biror noldan farqli songa (skalyarga) ko'paytirganda nima sodir bo'ladi?",
        options: ["Matritsaning har bir elementi shu songa ko'paytiriladi","Faqat birinchi satr elementlari ko'paytiriladi","Faqat bosh diagonal elementlari ko'paytiriladi","Faqat oxirgi ustun elementlari ko'paytiriladi"],
        correct: 0,
        explanation: "Matritsani skalyarga ko'paytirish qoidasiga ko'ra uning barcha elementlari shu songa birma-bir ko'paytiriladi.",
        expertHint: "Har bir katakchadagi element son bilan ko'paytiriladi."
    },
    {
        id: "alg_1_4",
        level: 1,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Barcha elementlari nolga teng bo'lgan matritsa nima deb ataladi?",
        options: ["Nol matritsa","Birlik matritsa","Diagonal matritsa","Teskari matritsa"],
        correct: 0,
        explanation: "Har bir elementi 0 ga teng bo'lgan ixtiyoriy o'lchamdagi matritsa nol matritsa deyiladi va O harfi bilan belgilanadi.",
        expertHint: "Barcha sonlari nol bo'lsa, bu nol matritsadir."
    },
    {
        id: "alg_1_5",
        level: 1,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Ikki matritsani o'zaro qo'shish yoki ayirish uchun qanday shart bajarilishi zarur?",
        options: ["Ularning o'lchamlari (satr va ustunlar soni) aynan bir xil bo'lishi shart","Ularning determinanti noldan farqli bo'lishi shart","Ikkala matritsa ham kvadrat bo'lishi shart","Faqat elementlari musbat sonlar bo'lishi shart"],
        correct: 0,
        explanation: "Matritsalarni qo'shish va ayirish faqat bir xil m x n o'lchamli matritsalar ustida mos elementlarni qo'shish/ayirish orqali bajariladi.",
        expertHint: "O'lchamlari aynan bir xil bo'lishi kerak."
    },
    {
        id: "alg_1_6",
        level: 1,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Matritsaning o'lchami m x n deb yozilsa, m va n nimani bildiradi?",
        options: ["m — satrlar soni, n — ustunlar soni","m — ustunlar soni, n — satrlar soni","m — determinant, n — rang","m — diagonal elementlar, n — burchak elementlar"],
        correct: 0,
        explanation: "Matritsa o'lchamida doimo birinchi bo'lib satrlar soni (m), ikkinchi bo'lib ustunlar soni (n) ko'rsatiladi.",
        expertHint: "Oldin satr, keyin ustun: m x n."
    },
    {
        id: "alg_1_7",
        level: 1,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Ikki matritsa qachon o'zaro teng deb hisoblanadi?",
        options: ["O'lchamlari bir xil bo'lib, barcha mos o'rindagi elementlari teng bo'lsa","Faqat birinchi elementlari teng bo'lsa","Faqat satrlar soni teng bo'lsa","Ixtiyoriy kvadrat matritsalar o'zaro tengdir"],
        correct: 0,
        explanation: "A = B bo'lishi uchun ularning o'lchamlari bir xil va har bir a_ij = b_ij elementi aynan teng bo'lishi zarur.",
        expertHint: "O'lchamlari ham, ichidagi har bir elementi ham teng bo'lishi kerak."
    },
    {
        id: "alg_1_8",
        level: 1,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Faqat bitta ustundan iborat bo'lgan m x 1 o'lchamli matritsa nima deyiladi?",
        options: ["Ustun-matritsa (ustun-vektor)","Satr-matritsa","Skalyar son","Birlik matritsa"],
        correct: 0,
        explanation: "Bitta ustundan tashkil topgan m x 1 matritsa ustun-vektor (ustun-matritsa) deb ataladi.",
        expertHint: "Ustun-matritsa yoki ustun-vektor."
    },
    {
        id: "alg_2_1",
        level: 2,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Bosh diagonali faqat 1 lardan, qolgan elementlari 0 lardan iborat kvadrat matritsa nima deyiladi?",
        options: ["Transponirlangan matritsa","Birlik matritsa (E yoki I)","Teskari matritsa","Ortogonal matritsa"],
        correct: 1,
        explanation: "Bosh diagonalida birlar va boshqa hamma joyda nollar bo'lgan matritsa Birlik matritsa deyiladi.",
        expertHint: "Bu birlik matritsa, matritsalarni ko'paytirishda sonlardagi 1 soni vazifasini bajaradi."
    },
    {
        id: "alg_2_2",
        level: 2,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Ikkita matritsani bir-biriga qo'shish uchun qanday asosiy shart bajarilishi kerak?",
        options: ["Har ikkala matritsaning o'lchamlari (satr va ustunlar soni) bir xil bo'lishi","Ikkala matritsaning determinanti nolga teng bo'lishi","Matritsalar faqat kvadrat bo'lishi","Faqat bosh diagonallari teng bo'lishi"],
        correct: 0,
        explanation: "Matritsalarni qo'shish va ayirish faqat ularning o'lchamlari bir xil (m x n) bo'lgandagina elementma-element amalga oshiriladi.",
        expertHint: "O'lchamlari bir xil bo'lsa, ularni qo'shish mumkin."
    },
    {
        id: "alg_2_3",
        level: 2,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Ikki vektorning skalyar ko'paytmasi nolga teng bo'lsa, ular qanday joylashgan bo'ladi?",
        options: ["O'zaro perpendikulyar (ortogonal)","Parallel (kollinear)","Qarama-qarshi yo'nalgan","Ustma-ust tushgan"],
        correct: 0,
        explanation: "a * b = |a|*|b|*cos(alpha). Skalyar ko'paytma nol bo'lsa, cos(alpha)=0, ya'ni burchak 90 gradus (ortogonal) bo'ladi.",
        expertHint: "Orasidagi burchak 90 gradus, ya'ni ortogonal."
    },
    {
        id: "alg_2_4",
        level: 2,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Ikki a(x1, y1) va b(x2, y2) tekislik vektorlarining skalyar ko'paytmasi qaysi formula bilan hisoblanadi?",
        options: ["x1*x2 + y1*y2","x1*y2 - x2*y1","x1*x2 * y1*y2","(x1+x2) / (y1+y2)"],
        correct: 0,
        explanation: "Dekart koordinatalarida vektorlarning skalyar ko'paytmasi mos koordinatalar ko'paytmalarining yig'indisiga teng: a*b = x1*x2 + y1*y2.",
        expertHint: "Mos koordinatalar ko'paytiriladi va qo'shiladi: x1*x2 + y1*y2."
    },
    {
        id: "alg_2_5",
        level: 2,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Matritsani ikki marta ketma-ket transponirlasa nima hosil bo'ladi: (A^T)^T = ?",
        options: ["Dastlabki A matritsaning o'zi","Teskari matritsa A^(-1)","Nol matritsa","-A matritsa"],
        correct: 0,
        explanation: "Satr va ustunlarni ikki bor o'rnini almashtirish yana boshlang'ich A matritsasini qaytaradi: (A^T)^T = A.",
        expertHint: "Dastlabki A matritsaning o'zi qaytadi."
    },
    {
        id: "alg_2_6",
        level: 2,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Ixtiyoriy matritsani nol soniga ko'paytirganda nima hosil bo'ladi?",
        options: ["Xuddi shu o'lchamdagi nol matritsa","1 soni","Birlik matritsa","Hisoblab bo'lmaydi"],
        correct: 0,
        explanation: "0 * A amali matritsaning barcha elementlarini 0 ga aylantiradi va natijada nol matritsa hosil bo'ladi.",
        expertHint: "Nol matritsa chiqadi."
    },
    {
        id: "alg_2_7",
        level: 2,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "A matritsaga qarama-qarshi bo'lgan (-A) matritsaning elementlari qanday bo'ladi?",
        options: ["A ning har bir elementining ishorasi qarama-qarshisiga o'zgargan bo'ladi","Faqat birinchi satri manfiy bo'ladi","Faqat diagonali manfiy bo'ladi","Elementlari teskari (1/a) sonlarga aylanadi"],
        correct: 0,
        explanation: "-A matritsa (-1) * A ga teng bo'lib, uning har bir elementining ishorasi teskarisiga o'zgaradi.",
        expertHint: "Barcha elementlar ishorasi qarama-qarshisiga almashadi."
    },
    {
        id: "alg_2_8",
        level: 2,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Vektorning uzunligi (moduli) uning koordinatalari orqali qanday aniqlanadi?",
        options: ["Koordinatalari kvadratlari yig'indisining kvadrat ildizi: sqrt(x^2 + y^2 + z^2)","Koordinatalarining oddiy arifmetik yig'indisi","Koordinatalarining ko'paytmasi","Faqat eng katta koordinataning o'zi"],
        correct: 0,
        explanation: "Pifagor teoremasiga binoan fazoviy vektorning uzunligi |v| = sqrt(x^2 + y^2 + z^2) ga teng bo'ladi.",
        expertHint: "Kvadratlar yig'indisining ildizi."
    },
    {
        id: "alg_3_1",
        level: 3,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        image: "assets/diagrams/matrix_determinant_2x2.svg",
        question: "2x2 o'lchamli [ [a, b], [c, d] ] matritsaning determinanti qaysi formula bilan topiladi?",
        options: ["ad + bc","ab - cd","ad - bc","ac - bd"],
        correct: 2,
        explanation: "2-tartibli determinant: asosiy diagonal ko'paytmasidan yordamchi diagonal ko'paytmasi ayriladi: det = ad - bc.",
        expertHint: "Asosiy diagonal minus yordamchi diagonal, ya'ni ad - bc."
    },
    {
        id: "alg_3_2",
        level: 3,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Kvadrat matritsada barcha satrlari va ustunlari o'rni almashtirilsa, uning determinanti qanday o'zgaradi?",
        options: ["O'zgarmaydi (det(A) = det(A^T))","Nolga aylanadi","Qarama-qarshi ishoraga o'zgaradi","Ikki barobar ortadi"],
        correct: 0,
        explanation: "Determinantning asosiy xossasiga ko'ra: transponirlash natijasida determinantning qiymati o'zgarmaydi.",
        expertHint: "Satr va ustunlar o'zgarganda determinant qiymati o'zgarmasdan qoladi."
    },
    {
        id: "alg_3_3",
        level: 3,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Uchburchak (yoki diagonal) matritsaning determinanti nimaga teng bo'ladi?",
        options: ["Bosh diagonal elementlarining ko'paytmasiga","Barcha elementlar yig'indisiga","Yordamchi diagonal elementlarining ko'paytmasiga","Har doim nolga"],
        correct: 0,
        explanation: "Yuqori yoki quyi uchburchak matritsaning determinanti uning bosh diagonalida joylashgan barcha elementlarning ko'paytmasiga teng.",
        expertHint: "Bosh diagonaldagi sonlarni bir-biriga ko'paytirib chiqish yetarli."
    },
    {
        id: "alg_3_4",
        level: 3,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Kvadrat matritsaning ikkita satri (yoki ustuni) bir xil bo'lsa, uning determinanti nimaga teng bo'ladi?",
        options: ["Nolga teng bo'ladi","1 ga teng bo'ladi","Bosh diagonal ko'paytmasiga teng bo'ladi","-1 ga teng bo'ladi"],
        correct: 0,
        explanation: "Determinantning xossasiga ko'ra, agar matritsada ikkita bir xil (yoki proporsional) satr bo'lsa, uning determinanti doimo nolga teng.",
        expertHint: "Ikkita bir xil satr bo'lsa, determinant 0 bo'ladi."
    },
    {
        id: "alg_3_5",
        level: 3,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Matritsani transponirlaganda uning determinanti qanday o'zgaradi?",
        options: ["Umuman o'zgarmaydi: det(A^T) = det(A)","Ishorasi qarama-qarshisiga o'zgaradi","Nolga aylanadi","Ikki barobar ortadi"],
        correct: 0,
        explanation: "Determinantning eng fundamental xossasi: matritsaning determinanti uning transponirlanganining determinantiga tengdir: det(A) = det(A^T).",
        expertHint: "Determinant o'zgarmaydi: det(A^T) = det(A)."
    },
    {
        id: "alg_3_6",
        level: 3,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Ixtiyoriy tartibli birlik matritsaning (I) determinanti nimaga teng?",
        options: ["1 ga teng","0 ga teng","Matritsaning tartibi n ga teng","Cheksizga teng"],
        correct: 0,
        explanation: "Birlik matritsaning diagonali faqat 1 lardan, qolgan joylari 0 lardan iborat bo'lgani uchun uning determinanti 1 * 1 * ... * 1 = 1 bo'ladi.",
        expertHint: "Birlik matritsa determinanti har doim 1 ga teng."
    },
    {
        id: "alg_3_7",
        level: 3,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Determinantning ikkita qo'shni satrining o'rni almashtirilsa, determinant qanday o'zgaradi?",
        options: ["Faqat ishorasi qarama-qarshisiga o'zgaradi","Qiymati kvadratga oshadi","Qiymati nol bo'ladi","Hech narsa o'zgarmaydi"],
        correct: 0,
        explanation: "Matritsaning ikkita satri o'rni almashtirilganda determinantning son qiymati saqlanib, ishorasi teskarisiga o'zgaradi.",
        expertHint: "Faqat ishorasi minusga o'zgaradi."
    },
    {
        id: "img_alg_3",
        level: 3,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        image: "assets/diagrams/matrix_determinant_2x2.svg",
        question: "Suratdagi chizmada ko'rsatilgan 2x2 determinant formulasiga binoan asosiy va yordamchi diagonallar qanday hisoblanadi?",
        options: ["a*d - b*c","a*b + c*d","a*c - b*d","(a + d) - (b + c)"],
        correct: 0,
        explanation: "2x2 determinant bosh diagonal ko'paytmasidan (a*d) yordamchi diagonal ko'paytmasini (b*c) ayirish orqali hisoblanadi: ad - bc.",
        expertHint: "Suratdagi yashil chiziqdan qizil chiziq ayriladi: a*d - b*c."
    },
    {
        id: "alg_4_1",
        level: 4,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Matritsaning satrlarini mos ravishda ustunlar bilan almashtirish amali nima deb ataladi?",
        options: ["Transponirlash (A^T)","Determinant olish","Rang topish","Ildiz chiqarish"],
        correct: 0,
        explanation: "Satrlarini ustunlar bilan almashtirish amali transponirlash deyiladi va A^T deb belgilanadi.",
        expertHint: "Satrni ustunga ag'darish bu transponirlash amali."
    },
    {
        id: "alg_4_2",
        level: 4,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "A va B matritsalarni ko'paytirish (A · B) qachon mumkin bo'ladi?",
        options: ["Ikkala matritsa ham simmetrik bo'lganda","A matritsaning ustunlar soni B matritsaning satrlar soniga teng bo'lganda","Ularning barcha elementlari musbat bo'lganda","Har doim ko'paytirish mumkin"],
        correct: 1,
        explanation: "A(m x k) va B(k x n) ko'rinishida bo'lgandagina, ya'ni A ning ustunlari soni B ning satrlari soniga teng bo'lsa ko'paytirish mumkin.",
        expertHint: "Birinchi matritsa ustuni ikkinchi matritsa satriga teng bo'lishi shart."
    },
    {
        id: "alg_4_3",
        level: 4,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Matritsalarni ko'paytirish amali uchun qaysi xossa umuman olganda O'RINLI EMAS?",
        options: ["Kommutativlik: A * B = B * A","Assotsiativlik: (A * B) * C = A * (B * C)","Distributivlik: A * (B + C) = AB + AC","Skalyar ko'paytuvchini chiqarish: k*(AB) = (kA)*B"],
        correct: 0,
        explanation: "Matritsalar ko'paytmasi umuman olganda kommutativ emas, ya'ni AB va BA bir-biriga teng bo'lmaydi va hatto o'lchamlari ham to'g'ri kelmasligi mumkin.",
        expertHint: "Matritsalarni o'rnini almashtirib ko'paytirish mumkin emas."
    },
    {
        id: "alg_4_4",
        level: 4,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Ikki kvadrat matritsa ko'paytmasining determinanti det(A * B) nimaga teng bo'ladi?",
        options: ["Determinantlar ko'paytmasiga: det(A) * det(B)","Determinantlar yig'indisiga: det(A) + det(B)","Faqat det(A) ning o'ziga","Har doim 1 ga"],
        correct: 0,
        explanation: "Konev-Bine teoremasiga ko'ra matritsalar ko'paytmasining determinanti ularning determinantlari ko'paytmasiga teng: det(AB) = det(A)*det(B).",
        expertHint: "det(A * B) = det(A) * det(B)."
    },
    {
        id: "alg_4_5",
        level: 4,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Matritsani o'zining teskari matritsasiga ko'paytirganda nima hosil bo'ladi: A * A^(-1) = ?",
        options: ["Birlik matritsa (I)","Nol matritsa (O)","A ning kvadrati","Skalyar son 1"],
        correct: 0,
        explanation: "Teskari matritsa ta'rifiga ko'ra: A * A^(-1) = A^(-1) * A = I (birlik matritsa).",
        expertHint: "Birlik matritsa (I) hosil bo'ladi."
    },
    {
        id: "alg_4_6",
        level: 4,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "2x3 o'lchamli A matritsani 3x4 o'lchamli B matritsaga ko'paytirganda hosil bo'ladigan C matritsaning o'lchami qanday bo'ladi?",
        options: ["2 x 4","3 x 3","2 x 3","Ko'paytirib bo'lmaydi"],
        correct: 0,
        explanation: "(m x k) va (k x n) matritsalar ko'paytmasi m x n o'lchamga ega bo'ladi. Bu yerda (2 x 3) * (3 x 4) = (2 x 4).",
        expertHint: "Birinchisining satri va ikkinchisining ustuni: 2 x 4."
    },
    {
        id: "alg_4_7",
        level: 4,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Teskari matritsaning determinanti det(A^(-1)) asosiy matritsa determinanti det(A) ga qanday bog'liq?",
        options: ["det(A^(-1)) = 1 / det(A)","det(A^(-1)) = -det(A)","det(A^(-1)) = det(A)^2","det(A^(-1)) = 0"],
        correct: 0,
        explanation: "det(A * A^(-1)) = det(I) = 1 bo'lgani sababli det(A) * det(A^(-1)) = 1, ya'ni det(A^(-1)) = 1 / det(A).",
        expertHint: "Bir bo'lingan det(A) ga teng: 1 / det(A)."
    },
    {
        id: "alg_5_1",
        level: 5,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Determinanti nolga teng bo'lgan (det(A) = 0) matritsa qanday matritsa deyiladi?",
        options: ["Maxsusmas matritsa","Maxsus (xos) matritsa (Degenerate)","Ortogonal matritsa","Unitar matritsa"],
        correct: 1,
        explanation: "Determinanti nolga teng bo'lsa, u maxsus (xos) matritsa deyiladi va teskari matritsaga ega bo'lmaydi.",
        expertHint: "det(A) = 0 bo'lsa, bu maxsus matritsa hisoblanadi."
    },
    {
        id: "alg_5_2",
        level: 5,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Matritsa uchun A · A^(-1) ko'paytmasi nimaga teng bo'ladi?",
        options: ["Nol matritsaga","Birlik matritsaga (E)","A matritsaning o'ziga","Determinantga"],
        correct: 1,
        explanation: "Matritsani o'zining teskari matritsasiga ko'paytirganda doimo birlik matritsa hosil bo'ladi: A * A^(-1) = E.",
        expertHint: "Teskari matritsaga ko'paytirish birlik matritsani (E) beradi."
    },
    {
        id: "alg_5_3",
        level: 5,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Chiziqli tenglamalar sistemasini Gauss usuli bilan yechishda qanday amallar bajariladi?",
        options: ["Kengaytirilgan matritsa ustida elementar satr almashtirishlari","Faqat determinantlarni 3-tartibda hisoblash","Faqat matritsani darajaga oshirish","Faqat o'zgaruvchilarni navbatma-navbat nolga tenglash"],
        correct: 0,
        explanation: "Gauss usuli kengaytirilgan matritsa satrlarini elementar almashtirishlar orqali pog'onasimon (uchburchak) ko'rinishga keltirishga asoslanadi.",
        expertHint: "Satrlarni songa ko'paytirish va bir-biriga qo'shish (elementar almashtirish)."
    },
    {
        id: "alg_5_4",
        level: 5,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Kramer usulida noma'lum o'zgaruvchi x_i qaysi formula bo'yicha topiladi?",
        options: ["x_i = Delta_i / Delta","x_i = Delta * Delta_i","x_i = Delta_i + Delta","x_i = Delta - Delta_i"],
        correct: 0,
        explanation: "Kramer qoidasiga binoan har bir noma'lum o'zgaruvchi yordamchi determinant Delta_i ni asosiy determinant Delta ga bo'lish orqali topiladi.",
        expertHint: "Delta_i / Delta bo'linmasi orqali."
    },
    {
        id: "alg_5_5",
        level: 5,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Agar chiziqli tenglamalar sistemasining barcha erkin hadlari nolga teng bo'lsa (AX = 0), bunday sistema nima deyiladi?",
        options: ["Bir jinsli sistema","Bir jinsli bo'lmagan sistema","Kramer sistemasi","Yechimga ega bo'lmagan sistema"],
        correct: 0,
        explanation: "Tenglamalarning o'ng tomonidagi barcha erkin hadlar nol bo'lgan CHTS bir jinsli chiziqli tenglamalar sistemasi deyiladi.",
        expertHint: "Bir jinsli sistema."
    },
    {
        id: "alg_5_6",
        level: 5,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Chiziqli tenglamalar sistemasida yechimlar soni nechta bo'lishi mumkin?",
        options: ["Yagona yechim, cheksiz ko'p yechim yoki umuman yechim yo'q","Faqat aynan 2 ta yechim","Faqat aynan 3 ta yechim","Har doim cheksiz ko'p yechim"],
        correct: 0,
        explanation: "CHTS faqat 3 holatda bo'lishi mumkin: yagona yechimga ega (aniqlangan), cheksiz ko'p yechimga ega (noaniq) yoki yechimga ega emas (birgalikda emas).",
        expertHint: "Yoki 1 ta, yoki cheksiz ko'p, yoki 0 ta (yechim yo'q)."
    },
    {
        id: "alg_5_7",
        level: 5,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Gauss usulida to'g'ri yurish (forward elimination) bosqichida kengaytirilgan matritsa qanday ko'rinishga keltiriladi?",
        options: ["Pog'onasimon (uchburchak) ko'rinishga","Birlik matritsaga","Faqat nol matritsaga","Diagonal matritsaga"],
        correct: 0,
        explanation: "Gauss usulining to'g'ri yo'lida pastki elementlar elementar satr amallari bilan nolga aylantirilib, matritsa yuqori uchburchak pog'onasimon shaklga keltiriladi.",
        expertHint: "Pog'onasimon (uchburchak) ko'rinishga."
    },
    {
        id: "alg_6_1",
        level: 6,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Ikki vektorning skalyar ko'paytmasi nolga teng bo'lsa (a · b = 0), bu vektorlar o'zaro qanday joylashgan?",
        options: ["Parallel (kolliniar)","Perpendikulyar (ortogonal)","Qarama-qarshi yo'nalgan","Bir to'g'ri chiziqda yotadi"],
        correct: 1,
        explanation: "Skalyar ko'paytma nol bo'lsa, burchak kosinusi cos(90°) = 0 bo'ladi, ya'ni vektorlar o'zaro perpendikulyar.",
        expertHint: "Skalyar ko'paytma 0 bo'lsa, vektorlar ortogonal, ya'ni perpendikulyardir."
    },
    {
        id: "alg_6_2",
        level: 6,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Kroneker-Kapelli teoremasi bo'yicha chiziqli tenglamalar sistemasi qachon birgalikda (yechimga ega) bo'ladi?",
        options: ["Asosiy matritsa rangi kengaytirilgan matritsa rangiga teng bo'lganda: rank(A) = rank(A|B)","Asosiy matritsa determinanti nolga teng bo'lganda","Kengaytirilgan matritsa rangi asosiy matritsa rangidan doimo katta bo'lganda","Tenglamalar soni noma'lumlar sonidan 2 barobar ko'p bo'lganda"],
        correct: 0,
        explanation: "Kroneker-Kapelli teoremasiga binoan CHTS yechimga ega bo'lishi uchun rank(A) = rank(A|B) bo'lishi zarur va yetarli.",
        expertHint: "Ikkala matritsaning (A va A|B) ranglari o'zaro teng bo'lishi shart."
    },
    {
        id: "alg_6_3",
        level: 6,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Vektorlar sistemasi qachon chiziqli erkli (chiziqli mustaqil) deb ataladi?",
        options: ["Ularning chiziqli kombinatsiyasi faqat barcha koeffitsiyentlar 0 bo'lgandagina nol vektorga teng bo'lsa","Hech bo'lmaganda bitta koeffitsiyent noldan farqli bo'lib nol vector hosil bo'lsa","Barcha vektorlar o'zaro teng bo'lsa","Vektorlar bitta to'g'ri chiziqda yotsa"],
        correct: 0,
        explanation: "c1*v1 + c2*v2 + ... + cn*vn = 0 tenglik faqat va faqat c1=c2=...=cn=0 bo'lganda bajarilsa, bu vektorlar chiziqli erkli deyiladi.",
        expertHint: "Faqat barcha koeffitsiyentlar nol bo'lgandagina nol vektor chiqadi."
    },
    {
        id: "alg_6_4",
        level: 6,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Pog'onasimon (trapetsiyasimon) ko'rinishga keltirilgan matritsaning rangi nimaga teng bo'ladi?",
        options: ["Uning noldan farqli satrlari soniga","Barcha ustunlari soniga","Bosh diagonaldagi sonlar yig'indisiga","Nollardan iborat satrlar soniga"],
        correct: 0,
        explanation: "Gauss almashtirishlaridan so'ng hosil bo'lgan pog'onali matritsaning rangi uning barcha nollardan iborat bo'lmagan (noldan farqli) satrlari soniga tengdir.",
        expertHint: "Noldan farqli satrlar soniga teng."
    },
    {
        id: "alg_6_5",
        level: 6,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Ikkita kollinear (parallel) vektorlar sistemasi haqida nima deyish mumkin?",
        options: ["Ular doimo chiziqli bog'liq bo'ladi","Ular doimo chiziqli erkli bo'ladi","Ular bazis hosil qiladi","Ularning skalyar ko'paytmasi nolga teng"],
        correct: 0,
        explanation: "Kollinear vektorlardan biri ikkinchisiga proporsional bo'lgani uchun (v1 = k * v2), ular doimo chiziqli bog'liq hisoblanadi.",
        expertHint: "Doimo chiziqli bog'liq bo'ladi."
    },
    {
        id: "alg_6_6",
        level: 6,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Tarkibida nol vektor qatnashgan har qanday vektorlar sistemasi qanday bo'ladi?",
        options: ["Doimo chiziqli bog'liq bo'ladi","Doimo chiziqli erkli bo'ladi","Bazis bo'ladi","Ortogonal bo'ladi"],
        correct: 0,
        explanation: "Nol vektorning koeffitsiyentini ixtiyoriy noldan farqli songa ko'paytirib nol vektor hosil qilish mumkinligi sababli sistema doimo chiziqli bog'liqdir.",
        expertHint: "Nol vektor bor bo'lsa, albatta chiziqli bog'liq bo'ladi."
    },
    {
        id: "alg_7_1",
        level: 7,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Chiziqli tenglamalar sistemasini noma'lumlarni pog'onali yo'qotish orqali yechish usuli kimning nomi bilan ataladi?",
        options: ["Gauss usuli","Kramer usuli","Nyuton usuli","Eyler usuli"],
        correct: 0,
        explanation: "Noma'lumlarni ketma-ket yo'qotish va uchburchak shaklga keltirish Gauss usuli deb ataladi.",
        expertHint: "Ketma-ket noma'lumni yo'qotish usuli bu mashhur Gauss usuli."
    },
    {
        id: "alg_7_2",
        level: 7,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Uch o'lchamli fazodagi (R^3) bazis nechta chiziqli erkli vektordan iborat bo'ladi?",
        options: ["Aynan 3 ta","Kamida 4 ta","Faqat 2 ta","Cheksiz ko'p"],
        correct: 0,
        explanation: "Fazo o'lchami n ga teng bo'lsa (R^n), uning ixtiyoriy bazisi aynan n ta chiziqli erkli vektordan iborat bo'ladi. R^3 uchun bu 3 ta.",
        expertHint: "O'lchov soniga teng bo'ladi, ya'ni 3 ta."
    },
    {
        id: "alg_7_3",
        level: 7,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Chiziqli fazo bazisi haqida bildirilgan qaysi fikr to'g'ri?",
        options: ["Fazoning ixtiyoriy vektori bazis vektorlar bo'yicha yagona usulda yoyiladi","Bitta fazoda faqat yagona bazis mavjud bo'lishi mumkin","Bazis vektorlar albatta o'zaro perpendikulyar bo'lishi shart","Bazis vektorlarning uzunliklari doimo 1 ga teng bo'ladi"],
        correct: 0,
        explanation: "Bazisning asosiy ta'rifiga ko'ra, fazoning har qanday vektori bazis vektorlarning chiziqli kombinatsiyasi shaklida yagona usulda ifodalanadi.",
        expertHint: "Koordinatalar va yoyilma yagona bo'ladi."
    },
    {
        id: "alg_7_4",
        level: 7,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Tekislikdagi (R^2) ixtiyoriy 2 ta nokollinear (parallel bo'lmagan) vektor nima hosil qiladi?",
        options: ["Tekislik uchun bazis","Matritsaning teskarisini","Faqat bitta nuqtani","Ortogonal proyeksiyani"],
        correct: 0,
        explanation: "2 o'lchamli fazoda ixtiyoriy 2 ta chiziqli erkli (nokollinear) vektor fazoning to'la bazisini tashkil etadi.",
        expertHint: "Tekislik bazisini hosil qiladi."
    },
    {
        id: "alg_7_5",
        level: 7,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Chiziqli qism fazo (subspace) bo'lishi uchun qaysi nuqta (vektor) unda albatta mavjud bo'lishi shart?",
        options: ["Nol vektor (koordinatalar boshi: 0)","Birlik vektor","Faqat musbat koordinatali vektor","Ixtiyoriy xos vektor"],
        correct: 0,
        explanation: "Chiziqli qism fazo 0*v = 0 nol vektorni o'z ichiga olishi va qo'shish hamda songa ko'paytirish amallariga nisbatan yopiq bo'lishi shart.",
        expertHint: "Nol vektor albatta bo'lishi kerak."
    },
    {
        id: "alg_7_6",
        level: 7,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Chiziqli fazoning o'lchami (dimension) deganda nima tushuniladi?",
        options: ["Ushbu fazoning ixtiyoriy bazisidagi vektorlar soni","Vektorlarning maksimal uzunligi","Matritsaning determinanti","Fazodagi nuqtalar soni"],
        correct: 0,
        explanation: "Fazo o'lchami (dim V) bu shu fazodagi maksimal chiziqli erkli vektorlar soni, ya'ni uning ixtiyoriy bazisidagi vektorlar sonidir.",
        expertHint: "Bazisdagi vektorlar soni."
    },
    {
        id: "alg_8_1",
        level: 8,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Matritsadagi chiziqli erkli satrlar (yoki ustunlar)ning maksimal soni nima deyiladi?",
        options: ["Matritsa izi (Trace)","Matritsa rangi (Rank)","Matritsa normasi","Spektr"],
        correct: 1,
        explanation: "Chiziqli erkli satrlar yoki ustunlarning eng katta soni matritsaning rangi (rank) deyiladi.",
        expertHint: "Chiziqli erkli satrlar soni - bu Rank (rang)."
    },
    {
        id: "alg_8_2",
        level: 8,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Matritsaning xos qiymatlarini topish uchun qaysi xarakteristik tenglama yechiladi?",
        options: ["det(A - lambda * I) = 0","det(A + lambda * I) = 1","A * I = lambda","trace(A) = lambda^2"],
        correct: 0,
        explanation: "Av = lambda*v munosabati (A - lambda*I)v = 0 ga keltiriladi. Noldan farqli yechim mavjud bo'lishi uchun det(A - lambda*I) = 0 bo'lishi shart.",
        expertHint: "det(A - lambda * I) = 0 xarakteristik tenglamasi."
    },
    {
        id: "alg_8_3",
        level: 8,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Kvadrat matritsaning barcha xos qiymatlari yig'indisi nimaga teng bo'ladi?",
        options: ["Matritsaning iziga (Trace - bosh diagonal elementlari yig'indisiga)","Matritsaning determinantiga","Har doim 1 ga","Matritsaning rangiga"],
        correct: 0,
        explanation: "Muhim algebraik xossaga ko'ra: xos qiymatlar yig'indisi matritsaning izi tr(A) ga, ularning ko'paytmasi esa det(A) ga teng.",
        expertHint: "Matritsa izi (Trace) bosh diagonal yig'indisidir."
    },
    {
        id: "alg_9_1",
        level: 9,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "A · x = λ · x tenglikda λ (lyambda) koeffitsiyenti A matritsaning nimasini bildiradi?",
        options: ["Determinantini","Xos qiymatini (Eigenvalue)","Rangini","Izini"],
        correct: 1,
        explanation: "A * x = λ * x da x xos vektor, λ esa unga mos keluvchi xos qiymat (eigenvalue) deb ataladi.",
        expertHint: "Bu xos son va xos vektor tenglamasi, λ - xos qiymatdir."
    },
    {
        id: "alg_9_2",
        level: 9,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Gram-Shmidt ortogonallash jarayoni chiziqli algebrada nima uchun qo'llaniladi?",
        options: ["Chiziqli erkli vektorlar bazisidan ortogonal (ortonormal) bazis hosil qilish uchun","CHTS ning yechimlar sonini aniqlash uchun","Matritsaning teskarisini topish uchun","Matritsaning rangini kamaytirish uchun"],
        correct: 0,
        explanation: "Gram-Shmidt algoritmi berilgan ixtiyoriy chiziqli erkli vektorlar tizimini qadamma-qadam ortogonal (va normalangan) tizimga aylantiradi.",
        expertHint: "Ortogonal va ortonormal bazis hosil qilish usuli."
    },
    {
        id: "alg_9_3",
        level: 9,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Ortonormal vektorlar tizimi deganda qanday vektorlar to'plami tushuniladi?",
        options: ["Har bir vektori birlik uzunlikka ega bo'lgan va o'zaro perpendikulyar vektorlar","Faqat musbat koordinatali vektorlar","Skalyar ko'paytmasi har doim 1 ga teng bo'lgan vektorlar","Bir xil tekislikda yotuvchi ixtiyoriy 2 ta vektor"],
        correct: 0,
        explanation: "Ortonormal tizimda vektorlar o'zaro ortogonal (<ui, uj> = 0, i!=j) va har bir vektorning normasi (uzunligi) 1 ga teng bo'ladi (<ui, ui> = 1).",
        expertHint: "Ortogonal (burchagi 90) + Normalangan (uzunligi 1)."
    },
    {
        id: "alg_10_1",
        level: 10,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Kvadrat matritsaning bosh diagonali elementlari yig'indisi nima deb ataladi?",
        options: ["Matritsa izi (Trace / Tr)","Matritsa determinanti","Matritsa rangi","Norma"],
        correct: 0,
        explanation: "Kvadrat matritsaning bosh diagonalida turgan sonlar yig'indisi matritsa izi (Tr(A)) deyiladi.",
        expertHint: "Bosh diagonal elementlari yig'indisi bu inglizcha Trace, o'zbekcha 'Iz'."
    },
    {
        id: "alg_10_2",
        level: 10,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Haqiqiy simmetrik matritsaning (A = A^T) xos qiymatlari haqida qaysi xossa doimo o'rinli?",
        options: ["Ularning barchasi haqiqiy (real) sonlar bo'ladi","Ularning barchasi kompleks sonlar bo'ladi","Ularning barchasi musbat butun sonlar bo'ladi","Xos qiymatlari mavjud bo'lmaydi"],
        correct: 0,
        explanation: "Spektral teoremaga asosan, ixtiyoriy haqiqiy simmetrik matritsaning barcha xos qiymatlari sof haqiqiy sonlardir va xos vektorlari ortogonal qilib tanlanishi mumkin.",
        expertHint: "Haqiqiy sonlar bo'ladi, kompleks qismi yo'q."
    },
    {
        id: "alg_10_3",
        level: 10,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Kvadratik formaning kanonik ko'rinishi qanday xususiyatga ega?",
        options: ["U faqat o'zgaruvchilarning kvadratlaridan iborat bo'lib, o'zaro ko'paytmalar (x_i * x_j) qatnashmaydi","Unda faqat chiziqli hadlar qatnashadi","Uning barcha koeffitsiyentlari 1 ga teng bo'ladi","O'zgaruvchilar soni 2 tadan oshmaydi"],
        correct: 0,
        explanation: "Kanonik ko'rinishda aralash hadlar yo'qotiladi, ya'ni formula lambda_1*y_1^2 + lambda_2*y_2^2 + ... shaklida bo'ladi.",
        expertHint: "Faqat kvadratlar qoladi, aralash ko'paytmalar yo'q."
    },
    {
        id: "alg_11_1",
        level: 11,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Transponirlanganda o'ziga teng bo'lgan kvadrat matritsa (A^T = A) qanday nomlanadi?",
        options: ["Qiya simmetrik matritsa","Simmetrik matritsa","Birlik matritsa","Ortogonal matritsa"],
        correct: 1,
        explanation: "A^T = A shartni qanoatlantiruvchi matritsalar simmetrik matritsalar deyiladi.",
        expertHint: "Transponirlanganda o'zgarmaydigan matritsa - Simmetrik matritsadir."
    },
    {
        id: "alg_11_2",
        level: 11,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Matritsaning QR dekompozitsiyasida (A = Q * R) Q va R qanday matritsalardir?",
        options: ["Q - ortogonal matritsa, R - yuqori uchburchak matritsa","Q - quyi uchburchak, R - diagonal matritsa","Q - simmetrik matritsa, R - teskari matritsa","Q - nol matritsa, R - birlik matritsa"],
        correct: 0,
        explanation: "QR ajratishda A matritsa Q ortogonal matritsa (Q^T * Q = I) va R yuqori uchburchak matritsalar ko'paytmasiga ajratiladi.",
        expertHint: "Q - ortogonal, R - right/upper triangular (yuqori uchburchak)."
    },
    {
        id: "alg_11_3",
        level: 11,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Xoleskiy (Cholesky) dekompozitsiyasi (A = L * L^T) qanday matritsalar uchun mavjud bo'ladi?",
        options: ["Simmetrik va qat'iy musbat aniqlangan matritsalar uchun","Ixtiyoriy to'rtburchak matritsalar uchun","Faqat nol matritsalar uchun","Faqat determinanti nol bo'lgan matritsalar uchun"],
        correct: 0,
        explanation: "Xoleskiy ajratishi simmetrik va musbat aniqlangan matritsani quyi uchburchak matritsa L va uning transponirlangani ko'paytmasiga ajratadi.",
        expertHint: "Simmetrik va musbat aniqlangan (positive-definite) bo'lishi shart."
    },
    {
        id: "alg_12_1",
        level: 12,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Chiziqli tenglamalar sistemasining yechimga ega bo'lishi haqidagi fundamental teorema qaysi?",
        options: ["Kroneker-Kapelli teoremasi","Ferma teoremasi","Rolle teoremasi","Koshi-Bunyakovskiy tengsizligi"],
        correct: 0,
        explanation: "Kroneker-Kapelli teoremasiga ko'ra, sistema yechimga ega bo'lishi uchun asosiy matritsa rangi kengaytirilgan matritsa rangiga teng bo'lishi lozim.",
        expertHint: "Matritsalar ranglari tengligi bo'yicha yechim borligini Kroneker-Kapelli teoremasi bildiradi."
    },
    {
        id: "alg_12_2",
        level: 12,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Keyli-Gamilton (Cayley-Hamilton) teoremasining asosiy mazmuni nimadan iborat?",
        options: ["Har qanday kvadrat matritsa o'zining xarakteristik tenglamasini qanoatlantiradi: p(A) = 0","Matritsaning teskarisi har doim uning transponirlanganiga teng","Ixtiyoriy matritsa diagonallashtirilishi shart","Matritsaning rangi uning satrlari sonidan oshmaydi"],
        correct: 0,
        explanation: "Keyli-Gamilton teoremasiga ko'ra p(lambda) = det(lambda*I - A) bo'lsa, lambda o'rniga A matritsani qo'yganda p(A) = 0 nol matritsa hosil bo'ladi.",
        expertHint: "Matritsa o'zining xarakteristik ko'pxadini nolga aylantiradi."
    },
    {
        id: "alg_12_3",
        level: 12,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Kvadrat matritsaning minimal ko'pxadi bilan xarakteristik ko'pxadi o'rtasida qanday bog'liqlik bor?",
        options: ["Minimal ko'pxad xarakteristik ko'pxadning bo'luvchisi bo'lib, uning barcha turli ildizlarini o'z ichiga oladi","Minimal ko'pxad xarakteristik ko'pxaddan doimo katta darajali bo'ladi","Ularning umumiy ildizlari bo'lmaydi","Minimal ko'pxad doimo 1-darajali bo'ladi"],
        correct: 0,
        explanation: "Minimal ko'pxad m(A) = 0 bo'ladigan eng kichik darajali ko'pxaddir va u xarakteristik ko'pxad p(lambda) ni qoldiqsiz bo'ladi.",
        expertHint: "Minimal ko'pxad xarakteristik ko'pxadni bo'luvchisidir."
    },
    {
        id: "alg_13_1",
        level: 13,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "O'zining transponirlanganiga ko'paytirilganda birlik matritsa beradigan (A · A^T = E) matritsa qanday ataladi?",
        options: ["Singulyar matritsa","Ortogonal matritsa","Idempotent matritsa","Nilpotent matritsa"],
        correct: 1,
        explanation: "Agar A * A^T = E bo'lsa, bunday matritsaning satrlari o'zaro ortonormal vektorlar bo'lib, u ortogonal matritsa deyiladi.",
        expertHint: "A ko'paytirilgan A^T teng E bo'lsa, bu Ortogonal matritsadir."
    },
    {
        id: "alg_13_2",
        level: 13,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Chiziqli algebrada o'lchamlar haqidagi fundamental Rank-Nullity teoremasi qaysi formulani tasdiqlaydi?",
        options: ["dim(ker(T)) + dim(im(T)) = dim(V)","dim(ker(T)) * dim(im(T)) = dim(V)","dim(ker(T)) - dim(im(T)) = 0","dim(im(T)) = 2 * dim(V)"],
        correct: 0,
        explanation: "T: V -> W chiziqli akslantirish uchun yadro o'lchami (nullity) va tasvir o'lchami (rank) yig'indisi fazo V ning o'lchamiga teng bo'ladi.",
        expertHint: "Yadro o'lchami + Tasvir o'lchami = Dastlabki fazo o'lchami."
    },
    {
        id: "alg_13_3",
        level: 13,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Ikki vektor fazo o'rtasidagi izomorfizm nima?",
        options: ["Bijektsiya (o'zaro bir qiymatli va ustiga) bo'lgan chiziqli akslantirish","Faqat nol vektorlarni almashtiruvchi operator","Skalyar kattaliklarni vektorga aylantiruvchi amallar","Faqat bir xil elementlardan tuzilgan matritsalar"],
        correct: 0,
        explanation: "Chiziqli izomorfizm bu chiziqlilikni saqlovchi va o'zaro bir qiymatli (bijektiv) bo'lgan akslantirishdir. O'lchami teng chekli o'lchamli fazolar izomorflidir.",
        expertHint: "Bijektsiya bo'lgan chiziqli akslantirish."
    },
    {
        id: "alg_14_1",
        level: 14,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "A^2 = A shartni qanoatlantiruvchi kvadrat matritsa qanday nomlanadi?",
        options: ["Idempotent matritsa","Nilpotent matritsa","Involyutiv matritsa","Simmetrik matritsa"],
        correct: 0,
        explanation: "O'z-o'ziga ko'paytirganda (kvadratida) yana o'ziga teng bo'lib qoladigan matritsalar idempotent deyiladi.",
        expertHint: "A^2 = A xossasi Idempotent matritsaga tegishlidir."
    },
    {
        id: "alg_14_2",
        level: 14,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Proyeksiyalash operatori P uchun qaysi algebraik shart (idempotentlik) bajarilishi shart?",
        options: ["P^2 = P","P^2 = -I","P^T = -P","det(P) = 1"],
        correct: 0,
        explanation: "Proyeksiyalash operatorini ikki marta ketma-ket qo'llash natijani o'zgartirmaydi, ya'ni P(P(v)) = P(v), binobarin P^2 = P (idempotent matritsa).",
        expertHint: "Kvadratga oshirganda yana o'zi chiqadi: P^2 = P."
    },
    {
        id: "alg_14_3",
        level: 14,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Data Science va signal tahlilidagi PCA (Asosiy komponentlar tahlili) usuli kovariatsiya matritsasining qaysi xossasiga tayanadi?",
        options: ["Eng katta xos qiymatlarga mos keluvchi xos vektorlar bo'yicha ma'lumotlar proyeksiyasiga","Faqat matritsa determinantining ishorasiga","Matritsaning barcha elementlarini nolga aylantirishga","Faqat tasodifiy elementlarni saralashga"],
        correct: 0,
        explanation: "PCA ma'lumotlarning maksimal dispersiyasini saqlab qolish uchun kovariatsiya matritsasining eng katta xos qiymatlariga mos xos vektorlarini asosiy yo'nalishlar sifatida oladi.",
        expertHint: "Kovariatsiya matritsasining xos qiymat va xos vektorlari."
    },
    {
        id: "alg_15_1",
        level: 15,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Har qanday to'g'ri to'rtburchak matritsani U · Σ · V^T ko'rinishida dekompozitsiya qilish qanday ataladi?",
        options: ["LU ajratish","Singulyar qiymatlar bo'yicha ajratish (SVD)","Xoleskiy ajratish","QR dekompozitsiya"],
        correct: 1,
        explanation: "SVD (Singular Value Decomposition) har qanday o'lchamli matritsani ortogonal va diagonal matritsalar ko'paytmasiga ajratadi.",
        expertHint: "Mashinali o'rganish va signallarni siqishda eng muhim ajratish - SVD."
    },
    {
        id: "alg_15_2",
        level: 15,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "m x n o'lchamli A va p x q o'lchamli B matritsalarning Kroneker ko'paytmasi (A x B) qanday o'lchamga ega bo'ladi?",
        options: ["(m * p) x (n * q)","(m + p) x (n + q)","(m * q) x (n * p)","m x q"],
        correct: 0,
        explanation: "Kroneker ko'paytmasida A ning har bir elementi B matritsaga ko'paytirilib joylanadi. Natijaviy blok matritsaning o'lchami (m*p) x (n*q) bo'ladi.",
        expertHint: "Satrlar ko'paytmasi (m*p) va ustunlar ko'paytmasi (n*q)."
    },
    {
        id: "alg_15_3",
        level: 15,
        category: "algebra",
        categoryName: "Chiziqli algebra",
        question: "Matritsaning spektral radiusi rho(A) nimani ifodalaydi?",
        options: ["Matritsaning barcha xos qiymatlari modullarining eng kattasini: max(|lambda_i|)","Bosh diagonaldagi eng kichik sonni","Matritsa determinantining modulini","Matritsa ustunlari sonining kvadratini"],
        correct: 0,
        explanation: "Spektral radius rho(A) = max{|lambda_i|: lambda_i in sigma(A)} bo'lib, spektrdagi eng katta absolut qiymatga teng.",
        expertHint: "Xos qiymatlar modullarining eng kattasi."
    },
    {
        id: "dis_1_1",
        level: 1,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Birorta ham elementga ega bo'lmagan to'plam qanday ataladi?",
        options: ["Cheksiz to'plam","Bo'sh to'plam (Ø)","Yagona to'plam","Birlik to'plam"],
        correct: 1,
        explanation: "Elementi bo'lmagan to'plam bo'sh to'plam deyiladi va Ø belgisi bilan belgilanadi.",
        expertHint: "Elementi yo'q to'plam bu bo'sh to'plam (Ø)."
    },
    {
        id: "dis_1_2",
        level: 1,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        image: "assets/diagrams/venn_intersection.svg",
        question: "A va B to'plamlarning har ikkalasiga bir vaqtda tegishli bo'lgan elementlar to'plami nima deyiladi?",
        options: ["To'plamlar kesishmasi (A ∩ B)","To'plamlar birlashmasi (A ∪ B)","To'plamlar ayirmasi","To'plamlar simmetrik ayirmasi"],
        correct: 0,
        explanation: "Ikkala to'plamda ham mavjud umumiy elementlar to'plami kesishma (A ∩ B) deyiladi.",
        expertHint: "Umumiy elementlar to'plami - bu to'plamlar kesishmasi."
    },
    {
        id: "dis_1_3",
        level: 1,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "n ta elementdan iborat chekli to'plamning barcha qism to'plamlari soni nechta bo'ladi?",
        options: ["2^n ta","n^2 ta","2*n ta","n! ta"],
        correct: 0,
        explanation: "To'plamning barcha qism to'plamlari to'plami (bulean) quvvati 2^n ga teng bo'ladi, chunki har bir element qism to'plamga yo kiradi, yo kirmaydi.",
        expertHint: "Daraja ko'rinishida bo'ladi: 2 ning n-darajasi."
    },
    {
        id: "dis_1_4",
        level: 1,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Ikki to'plamning ayirmasi A \\ B qanday elementlardan tashkil topadi?",
        options: ["A to'plamga tegishli, lekin B to'plamga tegishli bo'lmagan elementlardan","Faqat B to'plamga tegishli elementlardan","Ikkala to'plamga ham bir vaqtda tegishli elementlardan","Barcha universal elementlardan"],
        correct: 0,
        explanation: "To'plamlar ayirmasi A \\ B = {x | x in A va x not in B} qoidasiga binoan A ning B ga kirmagan xususiy elementlaridir.",
        expertHint: "A ga kiradigan, lekin B ga kirmaydigan elementlar."
    },
    {
        id: "dis_1_5",
        level: 1,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Har qanday to'plamning bo'sh to'plam bilan kesishmasi nimaga teng: A ∩ ∅ = ?",
        options: ["Bo'sh to'plamga (∅)","A to'plamning o'ziga","Universal to'plamga","Nol soniga"],
        correct: 0,
        explanation: "Bo'sh to'plamda hech qanday element bo'lmagani sababli, uning ixtiyoriy to'plam bilan umumiy elementlari ham bo'lmaydi: A ∩ ∅ = ∅.",
        expertHint: "Bo'sh to'plam (∅) chiqadi."
    },
    {
        id: "dis_1_6",
        level: 1,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Har qanday to'plamning o'zi bilan birlashmasi nimaga teng (Idempotentlik qonuni): A ∪ A = ?",
        options: ["A to'plamning o'ziga","Bo'sh to'plamga","2 * A ga","A to'plamning kvadratiga"],
        correct: 0,
        explanation: "Idempotentlik qonuniga binoan to'plamni o'ziga qo'shish yoki birlashtirish natijani o'zgartirmaydi: A ∪ A = A.",
        expertHint: "A to'plamning o'zi chiqadi."
    },
    {
        id: "dis_1_7",
        level: 1,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Universal to'plamdan (U) berilgan A to'plam elementlarini ayirib tashlash nima deb ataladi?",
        options: ["A to'plamning to'ldiruvchisi (A ning komplementi)","A to'plamning birlashmasi","Dekart ko'paytmasi","To'plam quvvati"],
        correct: 0,
        explanation: "Universal to'plamga nisbatan A ga kirmagan barcha elementlar to'plami A ning to'ldiruvchisi (not A yoki A') deyiladi.",
        expertHint: "A to'plamning to'ldiruvchisi (komplement)."
    },
    {
        id: "dis_1_8",
        level: 1,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Quyidagilardan qaysi biri cheksiz to'plamga yorqin misol bo'ladi?",
        options: ["Barcha natural sonlar to'plami N = {1, 2, 3, ...}","Alifbodagi harflar to'plami","Guruhdagi talabalar ro'yxati","Hafta kunlari to'plami"],
        correct: 0,
        explanation: "Natural sonlar cheksiz davom etadi va ularning elementlari soni cheksiz (sanokli cheksiz) to'plamni tashkil qiladi.",
        expertHint: "Natural sonlar to'plami."
    },
    {
        id: "dis_2_1",
        level: 2,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Mantiqiy 'VA' (konyunksiya, AND) amali qachon 1 (rost) qiymat qabul qiladi?",
        options: ["Faqat birinchi mulohaza rost bo'lganda","Ikkala mulohaza ham bir vaqtda 1 bo'lganda","Hech bo'lmaganda biri 1 bo'lganda","Har doim 1 bo'ladi"],
        correct: 1,
        explanation: "Konyunksiya faqat ikkala mulohaza ham rost (1 VA 1) bo'lgandagina 1 bo'ladi.",
        expertHint: "'VA' amali ikkala shart ham to'g'ri bo'lsagina rost natija beradi."
    },
    {
        id: "dis_2_2",
        level: 2,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Mantiqiy 'YOKI' (dizyunksiya, OR) amali qachon 0 (yolg'on) qiymat qabul qiladi?",
        options: ["Ikkala mulohaza ham 0 bo'lganda","Ikkala mulohaza ham 1 bo'lganda","Faqat birinchisi 1 bo'lganda","Hech qachon 0 bo'lmaydi"],
        correct: 0,
        explanation: "Dizyunksiya faqat ikkala kiruvchi qiymat ham yolg'on (0 YOKI 0) bo'lgandagina 0 bo'ladi.",
        expertHint: "Ikkala tomon ham 0 bo'lsa, 'YOKI' amali natijasi 0 bo'ladi."
    },
    {
        id: "dis_2_3",
        level: 2,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Matematik mantiqda A -> B (implikatsiya) amali qachon YOLG'ON (0) qiymat oladi?",
        options: ["Faqat A rost (1) va B yolg'on (0) bo'lganda","Faqat A yolg'on va B rost bo'lganda","Ikkala mulohaza ham yolg'on bo'lganda","Ikkala mulohaza ham rost bo'lganda"],
        correct: 0,
        explanation: "Implikatsiya faqat rost mulohazadan yolg'on xulosa kelib chiqqan holatda (1 -> 0) yolg'on bo'ladi, qolgan barcha holatlarda rost.",
        expertHint: "Faqat 1 -> 0 bo'lganda yolg'on."
    },
    {
        id: "dis_2_4",
        level: 2,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Mantiqiy ekvivalentlik amali (A <-> B) qachon ROST (1) qiymat qabul qiladi?",
        options: ["A va B ikkalasi ham bir vaqtda rost yoki ikkalasi ham bir vaqtda yolg'on bo'lganda","Faqat A rost bo'lganda","Faqat B yolg'on bo'lganda","Ikkala mulohaza har xil bo'lganda"],
        correct: 0,
        explanation: "Ekvivalentlik ikkala mulohaza bir xil mantiqiy qiymatga ega bo'lganda (1 <-> 1 = 1 va 0 <-> 0 = 1) rost bo'ladi.",
        expertHint: "Ikkala qiymat bir xil (teng) bo'lganda rost bo'ladi."
    },
    {
        id: "dis_2_5",
        level: 2,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "O'zgaruvchilarning har qanday qiymatlarida doimo ROST (1) natija beradigan mantiqiy ifoda nima deb ataladi?",
        options: ["Tavtologiya (aynan rost ifoda)","Ziddiyat (antiteza)","Inkor","Kontingensiya"],
        correct: 0,
        explanation: "Tavtologiya mantiq qonuni bo'lib, uning qiymatlar jadvalidagi barcha qatorlar 1 ga teng bo'ladi (masalan: A yoki (not A)).",
        expertHint: "Tavtologiya (doimo rost ifoda)."
    },
    {
        id: "dis_2_6",
        level: 2,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Ikkilamchi inkor qonuniga binoan not(not A) nimaga teng bo'ladi?",
        options: ["A mulohazaning o'ziga","Har doim 0 ga","Har doim 1 ga","A ning teskarisiga"],
        correct: 0,
        explanation: "Ikki marta ketma-ket inkor qilish dastlabki rostlik qiymatiga qaytaradi: not(not A) = A.",
        expertHint: "Dastlabki A ning o'ziga teng bo'ladi."
    },
    {
        id: "dis_2_7",
        level: 2,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "XOR (istisno etuvchi YOKI) amali kirishdagi ikkita qiymat 1 va 1 bo'lganda qanday natija beradi?",
        options: ["0 (Yolg'on)","1 (Rost)","2 soni","-1"],
        correct: 0,
        explanation: "XOR faqat bitta argument 1 bo'lgandagina 1 beradi, agar ikkalasi ham 1 bo'lsa (1 XOR 1), natija 0 bo'ladi.",
        expertHint: "1 XOR 1 = 0 bo'ladi."
    },
    {
        id: "dis_2_8",
        level: 2,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Mantiqiy ifodada: A AND 0 (kon'yunksiya nol bilan) nimaga teng?",
        options: ["0 (doimo yolg'on)","1","A ning o'ziga","Aniqlab bo'lmaydi"],
        correct: 0,
        explanation: "Kon'yunksiya amali uchun 0 nolga tenglashtiruvchi elementdir: A AND 0 = 0.",
        expertHint: "Doimo 0 (yolg'on) bo'ladi."
    },
    {
        id: "dis_3_1",
        level: 3,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Tugunlar (uchlar) va ularni tutashtiruvchi qirralardan tashkil topgan diskret struktura nima?",
        options: ["Graf (Graph)","Matritsa","Vektor","Kombinatsiya"],
        correct: 0,
        explanation: "Graf G = (V, E) ko'rinishida uchlar va qirralardan iborat tuzilmadir.",
        expertHint: "Uchlar va qirralar to'plami - bu graf."
    },
    {
        id: "dis_3_2",
        level: 3,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Daraxt (Tree) deb qanday grafga aytiladi?",
        options: ["Siklsiz, bog'langan oddiy grafga","Barcha cho'qqilari bir-biri bilan tutashgan grafga","Ikkita ajralgan komponentdan iborat grafga","Faqat bitta yo'nalishli sikli bor grafga"],
        correct: 0,
        explanation: "Graf nazariyasida daraxt deb hech qanday yopiq aylanma zanjir (sikl) mavjud bo'lmagan bog'langan asiklik grafga aytiladi.",
        expertHint: "Bog'langan va siklsiz (asiklik) graf."
    },
    {
        id: "dis_3_3",
        level: 3,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "n ta cho'qqidan iborat bo'lgan daraxtda nechta qirra (edge) mavjud bo'ladi?",
        options: ["n - 1 ta","n ta","n + 1 ta","2n ta"],
        correct: 0,
        explanation: "Daraxtning eng muhim xossasi: ixtiyoriy n ta cho'qqili daraxt doimo aynan n - 1 ta qirraga ega bo'ladi.",
        expertHint: "Cho'qqilar sonidan doimo 1 ta kam: n - 1."
    },
    {
        id: "dis_3_4",
        level: 3,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Barcha cho'qqilari o'zaro juft-jufti bilan qirralar orqali tutashgan oddiy graf nima deyiladi?",
        options: ["To'liq graf (Kn)","Bosh graf","Daraxt","Bo'sh graf"],
        correct: 0,
        explanation: "Har qanday ikkita cho'qqisi o'rtasida qirra mavjud bo'lgan graf to'liq graf deb ataladi va Kn belgisi bilan belgilanadi.",
        expertHint: "To'liq graf (Kn)."
    },
    {
        id: "dis_3_5",
        level: 3,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Grafda cho'qqini aynan o'ziga ulovchi qirra nima deb ataladi?",
        options: ["Sirtmoq (Loop)","Ko'prik","Ko'p qirra","Izolyatsiya"],
        correct: 0,
        explanation: "Boshi va oxiri bitta cho'qqida bo'lgan qirra sirtmoq (petlya / loop) deb ataladi.",
        expertHint: "Sirtmoq (Loop / petlya)."
    },
    {
        id: "dis_3_6",
        level: 3,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Hech qanday qirraga ega bo'lmagan (darajasi 0 bo'lgan) cho'qqi nima deyiladi?",
        options: ["Izolyatsiyalangan (ajralgan) cho'qqi","Osilib turuvchi cho'qqi","Markaziy cho'qqi","Ildiz cho'qqi"],
        correct: 0,
        explanation: "Unga hech qanday qirra tutashmagan (deg(v) = 0) cho'qqi izolyatsiyalangan cho'qqi deyiladi.",
        expertHint: "Izolyatsiyalangan cho'qqi."
    },
    {
        id: "dis_3_7",
        level: 3,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Har bir qirrasi aniq yo'nalishga (o'qqa) ega bo'lgan graf nima deyiladi?",
        options: ["Yo'naltirilgan graf (Orgat)","Yo'naltirilmagan graf","Daraxt","Planar graf"],
        correct: 0,
        explanation: "Qirralari tartiblangan juftliklardan iborat bo'lib yo'nalish ko'rsatilgan graflar yo'naltirilgan graflar (orgraf / digraph) deyiladi.",
        expertHint: "Yo'naltirilgan graf (Orgat)."
    },
    {
        id: "dis_4_1",
        level: 4,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Grafda bitta uchdan boshlanib, qirralar orqali yana o'sha boshlang'ich uchga qaytib keluvchi berk yo'l nima deyiladi?",
        options: ["Daraxt","Zanjir","Sikl (Cycle)","Ildiz"],
        correct: 2,
        explanation: "Boshlang'ich va oxirgi uchi bir xil bo'lgan yopiq yo'l sikl (cycle) deb ataladi.",
        expertHint: "Yopiq aylanma yo'l kompyuter fanlarida sikl (cycle) deyiladi."
    },
    {
        id: "dis_4_2",
        level: 4,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Grafda barcha cho'qqilar darajalari (degrees) yig'indisi qirralar soni (E) ga qanday bog'liq?",
        options: ["Qirralar sonining ikkilanganiga teng: Sum(deg(v)) = 2 * E","Qirralar sonining yarmiga teng: E / 2","Qirralar sonining kvadratiga teng: E^2","Cho'qqilar soni va qirralar yig'indisiga teng"],
        correct: 0,
        explanation: "Eylerning 'qo'l siqish lemmesi'ga ko'ra, har bir qirra 2 ta cho'qqiga tutashgani uchun barcha darajalar yig'indisi 2E ga teng.",
        expertHint: "Qirralar sonidan 2 barobar ko'p: 2E."
    },
    {
        id: "dis_4_3",
        level: 4,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Ixtiyoriy oddiy grafda toq darajali cho'qqilar soni haqida qaysi qoida doimo o'rinli?",
        options: ["Toq darajali cho'qqilar soni har doim JUFT bo'ladi","Toq darajali cho'qqilar soni doimo toq bo'ladi","Grafda toq darajali cho'qqi umuman bo'lishi mumkin emas","Toq darajali cho'qqilar soni qirralar sonidan doimo ko'p bo'ladi"],
        correct: 0,
        explanation: "Barcha darajalar yig'indisi 2E (juft son) bo'lgani sababli, toq darajali cho'qqilarning soni ham albatta juft bo'lishi shart.",
        expertHint: "Toq darajali cho'qqilar soni doimo juft bo'ladi."
    },
    {
        id: "dis_4_4",
        level: 4,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Boshlang'ich va oxirgi cho'qqisi bir xil bo'lgan, lekin boshqa cho'qqilari takrorlanmaydigan yo'l nima deyiladi?",
        options: ["Oddiy sikl (kontur)","Daraxt","Ko'prik","Gamilton yo'li"],
        correct: 0,
        explanation: "Yopiq va oraliq cho'qqilari takrorlanmaydigan yo'l oddiy sikl (yoki tsikl) deb ataladi.",
        expertHint: "Oddiy sikl (kontur)."
    },
    {
        id: "dis_4_5",
        level: 4,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        image: "assets/diagrams/complete_graph_k4.svg",
        question: "n ta cho'qqiga ega bo'lgan to'liq grafda (Kn) nechta qirra mavjud bo'ladi?",
        options: ["n * (n - 1) / 2 ta","n ta","n - 1 ta","n^2 ta"],
        correct: 0,
        explanation: "Kn da har bir cho'qqi qolgan n-1 ta cho'qqiga tutashgani va har qirra 2 cho'qqiga egaligi sababli qirralar soni n*(n-1)/2 bo'ladi.",
        expertHint: "n * (n - 1) / 2 ta qirra."
    },
    {
        id: "dis_4_6",
        level: 4,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Ixtiyoriy ikki cho'qqisi orasida kamida bitta yo'l mavjud bo'lgan graf nima deyiladi?",
        options: ["Bog'langan graf","Ajralgan graf","Bipartite graf","Bo'sh graf"],
        correct: 0,
        explanation: "Har qanday v1 va v2 cho'qqilarini bog'lovchi marshrut mavjud bo'lsa, bunday graf bog'langan graf deb ataladi.",
        expertHint: "Bog'langan graf."
    },
    {
        id: "dis_4_7",
        level: 4,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Faqat 1 ta qirraga tutashgan (darajasi 1 bo'lgan) cho'qqi nima deyiladi?",
        options: ["Osilib turuvchi (barg / bargcho'qqi)","Izolyatsiyalangan cho'qqi","Ichki tugun","Ildiz"],
        correct: 0,
        explanation: "deg(v) = 1 bo'lgan cho'qqi osilib turuvchi (pendant vertex) yoki daraxtlarda barg (leaf) deb ataladi.",
        expertHint: "Osilib turuvchi cho'qqi yoki barg."
    },
    {
        id: "img_dis_4",
        level: 4,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        image: "assets/diagrams/complete_graph_k4.svg",
        question: "Suratda tasvirlangan 4 ta cho'qqili to'liq grafda (K4) jami nechta qirra mavjud?",
        options: ["6 ta qirra","4 ta qirra","8 ta qirra","5 ta qirra"],
        correct: 0,
        explanation: "n=4 cho'qqili to'liq graf qirralari soni n*(n-1)/2 = 4*3/2 = 6 ta bo'ladi (4 ta tashqi tomon va 2 ta diagonal).",
        expertHint: "Suratdagi 4 ta ko'k va 2 ta sariq qirralarni sanang: jami 6 ta."
    },
    {
        id: "dis_5_1",
        level: 5,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Sikllarga (yopiq halqalarga) ega bo'lmagan bog'lamli graf nima deb ataladi?",
        options: ["Daraxt (Tree)","To'liq graf","Yo'naltirilgan graf","Bipartit graf"],
        correct: 0,
        explanation: "Daraxt – siklsiz bog'lamli grafdir. N ta uchi bor daraxtda doimo N - 1 ta qirra bo'ladi.",
        expertHint: "Siklsiz bog'langan graf bu daraxt (tree)."
    },
    {
        id: "dis_5_2",
        level: 5,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "n ta elementdan k tasini tartibga qaramasdan tanlab olish (kombinatsiya) formulasi qaysi?",
        options: ["C(n, k) = n! / (k! * (n - k)!)","A(n, k) = n! / (n - k)!","P(n) = n!","C(n, k) = n^k"],
        correct: 0,
        explanation: "Kombinatsiya formulasi C_n^k = n! / (k! * (n-k)!) bo'lib, tartib hisobga olinmagan guruhlashlarni hisoblaydi.",
        expertHint: "Maxrajda k! va (n - k)! ko'paytmasi bo'ladi."
    },
    {
        id: "dis_5_3",
        level: 5,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Dirixle prinsipi (kabutarlar qoidasi) qaysi mulohazani tasdiqlaydi?",
        options: ["Agar n ta qutiga n+1 ta buyum joylansa, kamida bitta qutida kamida 2 ta buyum bo'ladi","Har bir qutiga faqat bittadan buyum sig'adi","Buyumlar soni qutilar soniga doimo bo'linishi kerak","Barcha qutilar to'lmaguncha buyumlar qabul qilinmaydi"],
        correct: 0,
        explanation: "Dirixle prinsipi bo'yicha: n ta uyaga n+1 yoki undan ko'p kabutar qo'nsa, kamida bitta uyada ikkita yoki undan ortiq kabutar bo'ladi.",
        expertHint: "Buyumlar qutilardan ko'p bo'lsa, birontasida kamida ikkita bo'ladi."
    },
    {
        id: "dis_5_4",
        level: 5,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Kombinatorikadagi ko'paytirish qoidasiga ko'ra: agar birinchi ishni m xil, ikkinchi ishni n xil usulda bajarish mumkin bo'lsa, ikkala ishni birgalikda necha xil usulda bajarish mumkin?",
        options: ["m * n xil usulda","m + n xil usulda","m / n xil usulda","m^n xil usulda"],
        correct: 0,
        explanation: "Mustaqil ketma-ket ikkita tanlovni birgalikda amalga oshirish usullari soni ularning ko'paytmasiga teng: m * n.",
        expertHint: "Ko'paytirish qoidasi: m * n."
    },
    {
        id: "dis_5_5",
        level: 5,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Kombinatorikadagi qo'shish qoidasiga ko'ra: agar A tanlov m xil, B tanlov n xil usulda bajarilib, ular kesishmasa, 'A yoki B' ni tanlash necha xil bo'ladi?",
        options: ["m + n xil usulda","m * n xil usulda","n! xil usulda","m^n xil usulda"],
        correct: 0,
        explanation: "O'zaro kesishmaydigan muqobil tanlovlar bo'lganda 'yoki' amali usullar sonining qo'shilishiga olib keladi: m + n.",
        expertHint: "Qo'shish qoidasi: m + n."
    },
    {
        id: "dis_5_6",
        level: 5,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Matematikada 0! (nol faktorial) nimaga teng deb qabul qilingan?",
        options: ["1 ga teng","0 ga teng","Mavjud emas","-1 ga teng"],
        correct: 0,
        explanation: "Kombinatorika va gamma-funksiya qoidalariga ko'ra 0! = 1 bo'lib, bo'sh to'plamning o'rin almashtirishlari yagona (1 xil) ekanligini ifodalaydi.",
        expertHint: "0! har doim 1 ga teng."
    },
    {
        id: "dis_5_7",
        level: 5,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Tartib hisobga olingan holda n ta elementdan k tasini tanlash (o'rinlashtirish - A_n^k) formulasi qaysi?",
        options: ["A(n, k) = n! / (n - k)!","C(n, k) = n! / (k! * (n - k)!)","P(n) = n!","n^k"],
        correct: 0,
        explanation: "O'rinlashtirish (A_n^k) tartib muhim bo'lgan guruhlashlar soni bo'lib, n! / (n - k)! ga teng.",
        expertHint: "A(n, k) = n! / (n - k)!."
    },
    {
        id: "dis_6_1",
        level: 6,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "n ta elementdan iborat to'plamning barcha qism to'plamlari soni nechta?",
        options: ["n^2","2^n","2 * n","n!"],
        correct: 1,
        explanation: "n ta elementli to'plamning qism to'plamlari soni 2^n ga teng.",
        expertHint: "Har bir element uchun 2 ta imkoniyat bor (kiradi/kirmaydi), jami 2^n."
    },
    {
        id: "dis_6_2",
        level: 6,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Qisman tartib (partial order) munosabati qaysi uchta asosiy xossaga ega bo'lishi kerak?",
        options: ["Refleksivlik, antisimmetrik va tranzitivlik","Refleksivlik, simmetrik va tranzitivlik","Antirefleksivlik, assotsiativlik va distributivlik","Simmetrik, kommutativ va tranzitivlik"],
        correct: 0,
        explanation: "Qisman tartib munosabati (masalan, <= yoki qism to'plam bo'lish) refleksiv, antisimmetrik (agar aRb va bRa bo'lsa a=b) va tranzitiv bo'ladi.",
        expertHint: "Refleksiv, antisimmetrik va tranzitiv."
    },
    {
        id: "dis_6_3",
        level: 6,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Funksiya (akslantirish) qachon bijektiv (bir qiymatli o'zaro mos) hisoblanadi?",
        options: ["Bir vaqtning o'zida inyektiv va syuryektiv bo'lsa","Faqat har xil elementlarni bir xil qiymatga o'tkazsa","Faqat to'plamning bir qismidagina aniqlangan bo'lsa","Faqat doimiy o'zgarmas qiymat qabul qilsa"],
        correct: 0,
        explanation: "Bijektsiya bu har xil elementlar har xil tasvirga ega bo'lishi (inyeksiya) va barcha natijalar to'plami qamrab olinishi (syuryeksiya) birlashmasidir.",
        expertHint: "Inyeksiya + Syuryeksiya = Bijeksiya."
    },
    {
        id: "dis_6_4",
        level: 6,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Munosabatning refleksivlik xossasi nimani anglatadi?",
        options: ["To'plamning har bir elementi o'zi bilan munosabatda bo'lishini: har bir a uchun a R a","Agar a R b bo'lsa, b R a bo'lishini","Elementlar bir-biri bilan bog'lanmasligini","Faqat nol bilan bog'lanishini"],
        correct: 0,
        explanation: "Refleksivlik xossasi har bir elementning o'z-o'zi bilan ushbu munosabatda qatnashishini ifodalaydi (masalan: a = a yoki a <= a).",
        expertHint: "Har bir element o'z-o'zi bilan bog'lanadi: a R a."
    },
    {
        id: "dis_6_5",
        level: 6,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Munosabatning simmetriklik xossasi qanday ifodalanadi?",
        options: ["Agar a R b bo'lsa, u holda albatta b R a bo'lishi","Agar a R b bo'lsa, b R a bo'lmasligi","Har bir element faqat o'zi bilan bog'lanishi","Barcha elementlar tartiblangan bo'lishi"],
        correct: 0,
        explanation: "Simmetriklik yo'nalishsiz munosabat bo'lib, a element b bilan bog'langan bo'lsa, b ham a bilan bog'langan bo'ladi (masalan, do'stlik yoki tenglik).",
        expertHint: "Agar a R b bo'lsa, albatta b R a ham bo'ladi."
    },
    {
        id: "dis_6_6",
        level: 6,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Munosabatning tranzitivlik xossasi nimani bildiradi?",
        options: ["Agar a R b va b R c bo'lsa, u holda albatta a R c bo'lishi","Barcha elementlar yig'indisi nol bo'lishi","Munosabatning faqat bitta elementi bo'lishi","Elementlarning teskarisiga aylanishi"],
        correct: 0,
        explanation: "Tranzitivlik zanjirli uzatish qoidasi: a b bilan, b c bilan bog'langan bo'lsa, a to'g'ridan-to'g'ri c bilan ham bog'langan bo'ladi (masalan, a < b va b < c => a < c).",
        expertHint: "a R b va b R c bo'lsa, unda a R c bo'ladi."
    },
    {
        id: "dis_7_1",
        level: 7,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Grafning har bir qirrasidan roppa-rosa bir marta o'tuvchi yopiq yo'l qanday ataladi?",
        options: ["Eyler sikli","Gamilton sikli","Deykstra yo'li","BFS daraxti"],
        correct: 0,
        explanation: "Har bir qirradan faqat bir marta o'tuvchi sikl Eyler sikli deyiladi.",
        expertHint: "Qirralardan bir martadan o'tish bu Eyler siklidir."
    },
    {
        id: "dis_7_2",
        level: 7,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Grafda Gamilton sikli deganda nima tushuniladi?",
        options: ["Grafning har bir cho'qqisidan aynan bir marta o'tuvchi yopiq sikl","Grafning har bir qirrasidan aynan bir marta o'tuvchi sikl","Eng qisqa yo'ldan iborat ochiq marshrut","Faqat 3 ta cho'qqini o'z ichiga olgan uchburchak"],
        correct: 0,
        explanation: "Gamilton sikli grafdagi har bir CHO'QQINI aynan bir marta ziyorat qilib boshlang'ich nuqtaga qaytuvchi yopiq yo'ldir (Eylyer siklida esa qirralar).",
        expertHint: "Har bir cho'qqidan aynan 1 marta o'tadi."
    },
    {
        id: "dis_7_3",
        level: 7,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Tekislikda qirralari o'zaro kesishmasdan chizilishi mumkin bo'lgan graf nima deb ataladi?",
        options: ["Planar graf (tekis graf)","To'liq graf","Bipartite graf","Vaznli yo'naltirilgan graf"],
        correct: 0,
        explanation: "Qirralari tekislikda faqat umumiy cho'qqilardagina uchrashib, boshqa joyda kesishmaydigan graflar planar (tekis) graflar deyiladi.",
        expertHint: "Planar (tekis) graf."
    },
    {
        id: "dis_7_4",
        level: 7,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Bog'langan grafda Eylyer zanjiri (ochiq yo'li) mavjud bo'lishi uchun qanday shart bajarilishi kerak?",
        options: ["Grafdagi toq darajali cho'qqilar soni aynan 2 ta bo'lishi kerak","Barcha cho'qqilar toq darajali bo'lishi kerak","Grafda kamida 10 ta qirra bo'lishi kerak","Graf daraxt bo'lishi kerak"],
        correct: 0,
        explanation: "Eylyer teoremasiga binoan, ochiq Eylyer yo'li mavjud bo'lishi uchun toq darajali cho'qqilar soni aynan 2 ta bo'lishi shart (biri boshlanish, biri tugash cho'qqisi).",
        expertHint: "Toq darajali cho'qqilar soni aynan 2 ta bo'lishi kerak."
    },
    {
        id: "dis_7_5",
        level: 7,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Tekis (planar) bog'langan graflar uchun mashhur Eylyer formulasi qanday ko'rinishga ega?",
        options: ["V - E + F = 2 (Cho'qqilar - Qirralar + Yoqlar = 2)","V + E + F = 0","V * E = F","V - E = F + 1"],
        correct: 0,
        explanation: "Eylerning planar graflar formulasiga binoan: V (cho'qqilar) - E (qirralar) + F (yoqlar / yuzalar) = 2 bo'ladi.",
        expertHint: "V - E + F = 2."
    },
    {
        id: "dis_7_6",
        level: 7,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Quyidagi graflardan qaysi biri planar hisoblanadi (tekislikda qirralari kesishmasdan chiziladi)?",
        options: ["K3 (3 ta cho'qqili to'liq uchburchak graf)","K5 (5 ta cho'qqili to'liq graf)","K3,3 (uchga-uch to'liq ikki ulushli graf)","Hech biri"],
        correct: 0,
        explanation: "Kuratovskiy teoremasiga ko'ra K5 va K3,3 planar emas, lekin K3 va K4 to'liq graflari bemalol tekislikda kesishmasdan chiziladi.",
        expertHint: "K3 (uchburchak graf) planar hisoblanadi."
    },
    {
        id: "dis_8_1",
        level: 8,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "n ta elementni o'zaro o'rin almashtirishlar (permutatsiya) soni qaysi formula bilan topiladi?",
        options: ["2^n","n * (n - 1)","P_n = n!","n^2"],
        correct: 2,
        explanation: "n ta turli elementning o'rin almashtirishlari soni n faktorialga (n!) teng.",
        expertHint: "O'rin almashtirish formulasi n faktorial (n!)."
    },
    {
        id: "dis_8_2",
        level: 8,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Mantiqiy funksiyalarni grafik ko'rinishda qisqartirish va soddalashtirish uchun nima qo'llaniladi?",
        options: ["Karno xaritalari (Karnaugh maps)","Pifagor jadvali","Gantt diagrammasi","Nyuton binomi"],
        correct: 0,
        explanation: "Karno xaritalari Bul funksiyalarini ko'rgazmali katakchalar yordamida guruhlab, minimal DNF ko'rinishiga keltirish uchun ishlatiladi.",
        expertHint: "Karno xaritasi (Karnaugh map)."
    },
    {
        id: "dis_8_3",
        level: 8,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Mantiqiy amallardan qaysi biri universal hisoblanadi (faqat o'zi orqali barcha amallarni ifodalash mumkin)?",
        options: ["Sheffer shtrixi (NAND) yoki Pirs strelkasi (NOR)","Faqat kon'yunksiya (AND)","Faqat diz'yunksiya (OR)","Faqat ekvivalentlik (XNOR)"],
        correct: 0,
        explanation: "Sheffer shtrixi (NAND) va Pirs strelkasi (NOR) funksional to'liq binar amallar bo'lib, har biri mustaqil ravishda ixtiyoriy mantiqiy funksiyani qurishga yetarlidir.",
        expertHint: "Sheffer shtrixi (NAND) yoki Pirs strelkasi (NOR)."
    },
    {
        id: "dis_9_1",
        level: 9,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "!(A && B) = !A || !B mantiqiy ayniyati qanday nomlanadi?",
        options: ["De Morgan qonunlari","Pifagor qonuni","Bulev tenglamasi","Leybnits formulasi"],
        correct: 0,
        explanation: "De Morgan qonunlariga ko'ra konyunksiyaning inkori inkorlar dizyunksiyasiga teng.",
        expertHint: "Mantiqiy qavslarni ochishda amallarni teskarisiga o'zgartiruvchi qonun - De Morgan qonuni."
    },
    {
        id: "dis_9_2",
        level: 9,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Grafda bitta boshlang'ich cho'qqidan barcha qolgan cho'qqilargacha eng qisqa yo'lni topuvchi klassik algoritm qaysi?",
        options: ["Deykstra (Dijkstra) algoritmi","Kruskal algoritmi","DFS (chuqurlikka qidiruv)","Tezkor saralash (QuickSort)"],
        correct: 0,
        explanation: "Deykstra algoritmi manfiy vaznsiz graflarda manbadan barcha cho'qqilargacha minimal masofalarni topadi.",
        expertHint: "Deykstra (Dijkstra) algoritmi."
    },
    {
        id: "dis_9_3",
        level: 9,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Manfiy vaznli qirralari bo'lgan grafda eng qisqa yo'lni topish uchun qaysi algoritm qo'llaniladi?",
        options: ["Bellman-Ford algoritmi","Deykstra algoritmi","Prima algoritmi","Boyer-Mur algoritmi"],
        correct: 0,
        explanation: "Bellman-Ford algoritmi manfiy vaznli qirralarni to'g'ri ishlaydi va manfiy og'irlikdagi sikllar mavjudligini aniqlay oladi.",
        expertHint: "Bellman-Ford algoritmi."
    },
    {
        id: "dis_10_1",
        level: 10,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Grafda manfiy bo'lmagan og'irlikdagi qirralarda ikkita cho'qqi orasidagi eng qisqa yo'lni topuvchi klassik algoritm qaysi?",
        options: ["Kruskal algoritmi","Deykstra (Dijkstra) algoritmi","Prim algoritmi","Floyd algoritmi"],
        correct: 1,
        explanation: "Deykstra algoritmi bitta manbadan boshqa barcha uchlargacha eng qisqa yo'llarni topadi.",
        expertHint: "Eng qisqa masofani topish algoritmi bu Deykstra algoritmi."
    },
    {
        id: "dis_10_2",
        level: 10,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Post teoremasiga ko'ra, mantiqiy funksiyalar tizimi to'liq (universal) bo'lishi uchun qanday shart bajarilishi kerak?",
        options: ["U Postning 5 ta yopiq sinflarining (T0, T1, S, M, L) hech biriga to'liq tegishli bo'lmasligi kerak","U barcha funksiyalarni nolga aylantirishi kerak","Unda faqat 1 ta o'zgaruvchi qatnashishi kerak","Uning qiymatlar jadvali faqat birlardan iborat bo'lishi kerak"],
        correct: 0,
        explanation: "Post teoremasi: funksiyalar to'plami to'liq bo'lishi uchun u T0, T1, o'z-o'ziga ikkilanuvchi (S), monoton (M) va chiziqli (L) sinflarning birortasiga to'liq kirmasligi zarur va yetarlidir.",
        expertHint: "Postning 5 ta sinfidan kamida bittadan funksiya tashqarida bo'lishi kerak."
    },
    {
        id: "dis_10_3",
        level: 10,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Zhegalkin ko'pxadi (Zhegalkin polynomial) qaysi ikkita mantiqiy amal yordamida tuziladi?",
        options: ["Mod 2 bo'yicha qo'shish (XOR) va ko'paytirish (AND)","Faqat inkor (NOT) va diz'yunksiya (OR)","Implikatsiya va ekvivalentlik","Faqat Sheffer shtrixi"],
        correct: 0,
        explanation: "Zhegalkin ko'pxadi ixtiyoriy Bul funksiyasini XOR (modul 2 bo'yicha qo'shish) va AND (ko'paytirish) amallari orqali yagona ko'rinishda ifodalaydi.",
        expertHint: "XOR (modul 2) va AND (ko'paytirish)."
    },
    {
        id: "dis_11_1",
        level: 11,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Grafning har bir cho'qqisidan roppa-rosa bir marta o'tib qaytuvchi sikl nima deyiladi?",
        options: ["Eyler sikli","Gamilton sikli","Daraxt ildizi","Klik"],
        correct: 1,
        explanation: "Barcha uchlarni faqat bir martadan ziyorat qilib chiquvchi sikl Gamilton sikli deyiladi.",
        expertHint: "Uchlar (cho'qqilar) bo'yicha bir martalik yo'l - Gamilton siklidir."
    },
    {
        id: "dis_11_2",
        level: 11,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Master Theorem (Asosiy teorema) algoritmlar nazariyasida nima uchun xizmat qiladi?",
        options: ["'Bo'lib tashla va hukmronlik qil' (Divide and Conquer) rekursiv algoritmlarining asimptotik vaqt murakkabligini hisoblash uchun","Grafdagi maksimal oqimni aniqlash uchun","Kriptografik kalitlarni generatsiya qilish uchun","Daraxtlarning balandligini cheklash uchun"],
        correct: 0,
        explanation: "Master Theorem T(n) = a*T(n/b) + f(n) ko'rinishidagi bo'lib tashla va hukmronlik qil turidagi rekursiv munosabatlarning O-katta murakkabligini tezkor baholaydi.",
        expertHint: "Bo'lib tashla va hukmronlik qil rekursiyalarining vaqt murakkabligi."
    },
    {
        id: "dis_11_3",
        level: 11,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Kombinatorikada hosil qiluvchi (generatsiyalovchi) funksiyalar nima uchun qo'llaniladi?",
        options: ["Ketma-ketliklarni darajali qatorlar koeffitsiyentlari orqali ixcham tahlil qilish va rekursiyalarni yechish uchun","Graf qirralarini raqamlash uchun","Faqat xotira hajmini kamaytirish uchun","Tasodifiy sonlarni generatsiyalash uchun"],
        correct: 0,
        explanation: "Generatsiyalovchi funksiya a_n sonli ketma-ketligini sum(a_n * x^n) darajali qatori yordamida ifodalab, murakkab rekurrent munosabatlarni algebraik yechish imkonini beradi.",
        expertHint: "Ketma-ketliklarni darajali qatorlar orqali ifodalash va yechish."
    },
    {
        id: "dis_12_1",
        level: 12,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Ikkita to'plam elementlari orasida o'zaro bir qiymatli to'liq moslik o'rnatilsa, bunday akslantirish qanday ataladi?",
        options: ["Biyeksiya (Inyeksiya + Syuryeksiya)","Faqat Inyeksiya","Faqat Syuryeksiya","Gomomorfizm"],
        correct: 0,
        explanation: "Bir vaqtning o'zida ham inyektiv, ham syuryektiv bo'lgan moslik biyeksiya deyiladi.",
        expertHint: "O'zaro bir qiymatli moslik - bu biyeksiya."
    },
    {
        id: "dis_12_2",
        level: 12,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Xomskiy (Chomsky) ierarxiyasida regulyar (muntazam) tillar qaysi abstrakt hisoblash modeli tomonidan tan olinadi?",
        options: ["Chekli avtomatlar (Finite State Automata - DFA/NFA)","Magazinli (Pushdown) avtomatlar","Chiziqli chegaralangan avtomatlar","Faqat universal Tyuring mashinasi"],
        correct: 0,
        explanation: "3-tur grammatika (regulyar tillar) chekli avtomatlar (DFA va NFA) yordamida to'liq tan olinadi va regulyar ifodalar (regex) bilan tavsiflanadi.",
        expertHint: "Chekli avtomatlar (DFA / NFA)."
    },
    {
        id: "dis_12_3",
        level: 12,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Tyuring mashinasi nima?",
        options: ["Cheksiz lenta va o'qish/yozish boshchasiga ega, hisoblanuvchanlik nazariyasining universal abstrakt modeli","Faqat mexanik soatlarni ishlatuvchi qurilma","Faqat 10 lik sanoq sistemasida ishlaydigan dastur","Tarmoq paketlarini yo'naltiruvchi maxsus router"],
        correct: 0,
        explanation: "Alan Tyuring taklif etgan Tyuring mashinasi algoritm va hisoblanuvchanlikning eng fundamental nazariy modeli hisoblanadi.",
        expertHint: "Cheksiz lentali universal abstrakt hisoblash modeli."
    },
    {
        id: "dis_13_1",
        level: 13,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Vaznli bog'lamli grafda minimal qamrovchi daraxtni (MST) qirralarni saralash orqali quruvchi algoritm qaysi?",
        options: ["Kruskal algoritmi","Deykstra algoritmi","A* qidiruv","DFS"],
        correct: 0,
        explanation: "Kruskal algoritmi qirralarni og'irligi bo'yicha o'sish tartibida saralab, minimal qamrovchi daraxt quradi.",
        expertHint: "Minimal qamrovchi daraxt uchun qirralarni tartiblovchi algoritm - Kruskal."
    },
    {
        id: "dis_13_2",
        level: 13,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "To'rt rang teoremasi (Four Color Theorem) graflar nazariyasida nimani isbotlaydi?",
        options: ["Ixtiyoriy planar xaritani qo'shni davlatlar har xil rangda bo'lishi uchun ko'pi bilan 4 rang bilan bo'yash mumkin","Faqat to'rtburchak graflar 4 rangga bo'yaladi","Grafda har doim kamida 4 ta mustaqil qirra mavjud bo'ladi","Planar grafning xromatik soni doimo 2 ga teng bo'ladi"],
        correct: 0,
        explanation: "To'rt rang teoremasiga ko'ra, tekislikdagi har qanday xaritani yonma-yon hududlar bir xil rang olmasligi sharti bilan ko'pi bilan 4 xil rang yordamida bo'yash yetarlidir.",
        expertHint: "Har qanday planar xarita ko'pi bilan 4 ta rang bilan bo'yaladi."
    },
    {
        id: "dis_13_3",
        level: 13,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Ikki ulushli (bipartite) grafning xromatik soni (chromatic number) qanchaga teng?",
        options: ["Kamida bitta qirraga ega bo'lsa, 2 ga teng","Har doim 3 ga teng","Cho'qqilar soniga teng","Cheksizga teng"],
        correct: 0,
        explanation: "Ikki ulushli grafda barcha qirralar faqat birinchi va ikkinchi guruh cho'qqilari orasida joylashgani sababli uni 2 ta rang bilan to'g'ri bo'yash mumkin.",
        expertHint: "2 ga teng, chunki ikkita alohida ulushdan iborat."
    },
    {
        id: "dis_14_1",
        level: 14,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Tekislikda chizilgan har qanday xaritani qo'shni davlatlar bir xil rangda bo'lmasligi uchun minimal necha rang yetarli?",
        options: ["3 ta rang","4 ta rang (To'rt rang teoremasi)","5 ta rang","6 ta rang"],
        correct: 1,
        explanation: "1976-yilda isbotlangan 'To'rt rang teoremasi'ga ko'ra tekis grafni 4 ta rang bilan to'liq bo'yash mumkin.",
        expertHint: "Mashhur to'rt rang muammosi - javob 4 ta rang."
    },
    {
        id: "dis_14_2",
        level: 14,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Edmonds-Karp algoritmi maksimal oqimni topishda qaysi strategiyadan foydalanadi?",
        options: ["Qo'shimcha yo'lni (augmenting path) kenglik bo'yicha qidiruv (BFS) orqali eng qisqa qirralar soni bilan topadi","Chuqurlikka qidiruv (DFS) yordamida eng chuqur yo'lni tanlaydi","Tasodifiy tanlash usulini qo'llaydi","Har bir bosqichda faqat eng katta og'irlikdagi qirrani o'chiradi"],
        correct: 0,
        explanation: "Edmonds-Karp algoritmi Ford-Falkerson usulining takomillashtirilgani bo'lib, o'tkazuvchanlik yo'llarini BFS orqali topib, O(V * E^2) kafolatlangan vaqt murakkabligini beradi.",
        expertHint: "Kenglik bo'yicha qidiruv (BFS) orqali qisqa yo'llarni qidiradi."
    },
    {
        id: "dis_14_3",
        level: 14,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Bog'langan grafda 'Ko'prik' (Bridge) deb qanday qirraga aytiladi?",
        options: ["Olib tashlansa, grafning bog'lanish komponentlari soni ortib ketadigan qirraga","Grafdagi eng uzun va vaznli qirraga","Faqat ikkita sikl o'rtasidagi parallel qirralarga","Har ikki uchida toq darajali cho'qqilar bo'lgan qirraga"],
        correct: 0,
        explanation: "Ko'prik (kesuvchi qirra) shunday qirraki, uni grafdan o'chirish natijasida bog'langan graf ikki yoki undan ortiq ajralgan qismlarga bo'linib ketadi.",
        expertHint: "O'chirilganda graf uzilib, qismlarga ajraladi."
    },
    {
        id: "dis_15_1",
        level: 15,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Polinomial vaqtda yechimini tekshirish oson bo'lgan, ammo yechish algoritmi polinomial bo'lmagan masalalar sinfi nima?",
        options: ["P sinfi","NP masalalar sinfi","O(1) sinfi","Rekursiv sinf"],
        correct: 1,
        explanation: "NP (Nondeterministic Polynomial) masalalarida berilgan yechimning to'g'riligini polinomial vaqtda tekshirish mumkin.",
        expertHint: "Mashhur P vs NP muammosi, javob - NP masalalar sinfi."
    },
    {
        id: "dis_15_2",
        level: 15,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Hisoblash murakkabligi nazariyasida P va NP sinflarining tub farqi nimada?",
        options: ["P sinfidagi masalalar determinatsiyalangan polinomial vaqtda YECHILADI, NP dagi masalalar esa berilgan yechimi polinomial vaqtda TEKSHIRILADI","P dagi masalalar yechimga ega emas, NP dagi masalalar yechimga ega","P faqat parallel kompyuterlar uchun, NP bitta yadroli protsessorlar uchun","NP masalalar hech qachon kompyuterda hisoblanmaydi"],
        correct: 0,
        explanation: "P - determinatsiyalangan tyuring mashinasida O(n^k) vaqtda yechiladigan masalalar. NP - taklif qilingan javob sertifikatini polinomial vaqtda tekshirib (verifikatsiya qilib) bo'ladigan masalalar.",
        expertHint: "P - tez yechiladi, NP - berilgan yechim tez tekshiriladi."
    },
    {
        id: "dis_15_3",
        level: 15,
        category: "discrete",
        categoryName: "Diskret tuzilmalar",
        question: "Grafda 'Maksimal Klika' (Maximum Clique) va 'Maksimal Mustaqil To'plam' masalalari qaysi murakkablik sinfiga kiradi?",
        options: ["NP-to'liq (NP-Complete)","Chiziqli vaqtda yechiluvchi O(n)","P sinfiga kiruvchi oson masalalar","Algoritmik jihatdan hal qilib bo'lmaydigan (Undecidable)"],
        correct: 0,
        explanation: "Klika va Mustaqil to'plam masalalari Karpning mashhur 21 ta NP-to'liq masalalar ro'yxatiga kiradi va umumiy holatda polinomial yechimi topilmagan.",
        expertHint: "NP-to'liq (NP-Complete) masalalar."
    },
    {
        id: "net_1_1",
        level: 1,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "OSI (Open Systems Interconnection) etalon modelida jami nechta sath (qatlam) mavjud?",
        options: ["4 ta","7 ta qatlam","5 ta","8 ta"],
        correct: 1,
        explanation: "OSI modeli 7 ta qatlamdan iborat: Jismoniy, Kanal, Tarmoq, Transport, Seans, Taqdimot, Dasturiy.",
        expertHint: "OSI modelida jami 7 ta qatlam mavjud."
    },
    {
        id: "net_1_2",
        level: 1,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Lokal tarmoqni global Internet bilan bog'lovchi asosiy yo'naltiruvchi qurilma nima?",
        options: ["Router (Marshrutizator)","Fleshka","Monitor","Printer"],
        correct: 0,
        explanation: "Router turli tarmoqlar o'rtasida IP paketlarni yo'naltirish (routing) vazifasini bajaradi.",
        expertHint: "Tarmoqlararo paketlarni yo'naltiruvchi qurilma - Router."
    },
    {
        id: "net_1_3",
        level: 1,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Lokal kompyuter tarmog'ining xalqaro qabul qilingan qisqartmasi qaysi?",
        options: ["LAN (Local Area Network)","WAN (Wide Area Network)","MAN (Metropolitan Area Network)","PAN (Personal Area Network)"],
        correct: 0,
        explanation: "Bitta bino, xona yoki korxona miqyosidagi mahalliy tarmoq LAN (Local Area Network) deb ataladi.",
        expertHint: "Lokal tarmoq qisqartmasi LAN hisoblanadi."
    },
    {
        id: "net_1_4",
        level: 1,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Butun dunyo bo'ylab millionlab kompyuter va qurilmalarni birlashtiruvchi global tarmoq nima deb ataladi?",
        options: ["Internet","Intranet","Bluetooth","Ethernet"],
        correct: 0,
        explanation: "Internet bu yagona standart TCP/IP protokollari asosida ishlovchi butunjahon global kompyuterlar tarmog'idir.",
        expertHint: "Global butunjahon tarmog'i — Internet."
    },
    {
        id: "net_1_5",
        level: 1,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Tarmoqqa ulangan va o'zining shaxsiy IP manziliga ega bo'lgan har qanday kompyuter yoki qurilma nima deyiladi?",
        options: ["Xost (Host) yoki Tugun (Node)","Konnektor","Fleshka","Shina"],
        correct: 0,
        explanation: "Tarmoqda manzilga ega bo'lgan va ma'lumot almasha oladigan mustaqil qurilma xost (host) yoki tugun deb yuritiladi.",
        expertHint: "Xost (Host) yoki Tugun (Node)."
    },
    {
        id: "net_1_6",
        level: 1,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Simsiz mahalliy kompyuter tarmog'ining xalqaro standarti va keng tarqalgan nomi nima?",
        options: ["Wi-Fi (WLAN)","Ethernet","Optika","Dial-Up"],
        correct: 0,
        explanation: "Wi-Fi (Wireless Fidelity / IEEE 802.11) simsiz radio to'lqinlar orqali lokal tarmoq hosil qilish texnologiyasidir.",
        expertHint: "Wi-Fi (WLAN)."
    },
    {
        id: "net_1_7",
        level: 1,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Shahar yoki mamlakatlar miqyosidagi yirik global tarmoqning xalqaro qisqartmasi qaysi?",
        options: ["WAN (Wide Area Network)","LAN (Local Area Network)","PAN (Personal Area Network)","SAN"],
        correct: 0,
        explanation: "Katta geografik hududlarni qamrab olgan hududiy-global tarmoq WAN (Wide Area Network) deb nomlanadi.",
        expertHint: "WAN (Wide Area Network)."
    },
    {
        id: "net_1_8",
        level: 1,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Tarmoqdagi boshqa kompyuterlarga (mijozlarga) xizmatlar, ma'lumotlar va resurslarni ulashuvchi markaziy kompyuter nima deyiladi?",
        options: ["Server","Klient","Modem","Repiter"],
        correct: 0,
        explanation: "Mijozlar (client) so'rovlariga xizmat ko'rsatuvchi, fayllar yoki veb-sahifalarni taqdim etuvchi kuchli kompyuter server deyiladi.",
        expertHint: "Server kompyuteri."
    },
    {
        id: "img_net_2",
        level: 2,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        image: "assets/diagrams/star_topology.svg",
        question: "Suratdagi kompyuter tarmog'i diagrammasida qaysi topologiya tasvirlangan?",
        options: ["Yulduz (Star) topologiyasi","Shina (Bus) topologiyasi","Halqa (Ring) topologiyasi","To'liq to'r (Mesh) topologiyasi"],
        correct: 0,
        explanation: "Barcha xostlar bitta markaziy kommutatorga (Switch) alohida nurlar orqali ulangan topologiya Yulduz (Star) deyiladi.",
        expertHint: "Markazda Switch joylashgan va atrofdagi kompyuterlar unga nurlar kabi ulangan — bu Yulduz topologiyasi."
    },
    {
        id: "net_2_1",
        level: 2,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Standart IPv4 manzili nechta bitdan tashkil topgan?",
        options: ["16 bit","32 bit (4 bayt)","64 bit","128 bit"],
        correct: 1,
        explanation: "IPv4 manzili 32 bitdan iborat bo'lib, har biri 8 bitli 4 ta oktetdan tashkil topadi.",
        expertHint: "IPv4 da 32 bit bor (IPv6 da esa 128 bit)."
    },
    {
        id: "net_2_2",
        level: 2,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Optik tolali aloqa kabelida axborot signallari qanday jismoniy vosita orqali uzatiladi?",
        options: ["Yorug'lik nurlari (fotonlar / lazer impulslari)","Elektr toki tebranishlari","Radio to'lqinlar","Tovush to'lqinlari"],
        correct: 0,
        explanation: "Optik tolali kabellarda shisha yoki plastik tola ichida to'liq ichki qaytish hodisasi orqali yorug'lik impulslari shaklida ma'lumot uzatiladi.",
        expertHint: "Yorug'lik impulslari (nur) orqali."
    },
    {
        id: "net_2_3",
        level: 2,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Buralgan juftlik (Twisted Pair / UTP) kabelini tarmoq kartasiga ulash uchun qaysi konnektor turi ishlatiladi?",
        options: ["RJ-45","RJ-11","BNC","VGA"],
        correct: 0,
        explanation: "Ethernet kompyuter tarmoqlarida 8 kontaktli RJ-45 konnektori standart hisoblanadi (RJ-11 esa 4 kontaktli telefon konnektori).",
        expertHint: "RJ-45 tarmoq konnektori."
    },
    {
        id: "net_2_4",
        level: 2,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Standart buralgan juftlik (UTP) kabeli orqali ma'lumot uzatishning maksimal kafolatlangan masofasi qancha?",
        options: ["100 metr","500 metr","1000 metr","20 metr"],
        correct: 0,
        explanation: "Ethernet standartiga ko'ra (100Base-TX / 1000Base-T) UTP kabeli orqali signal kuchaytirgichsiz maksimal 100 metr masofagacha uzatiladi.",
        expertHint: "Standart bo'yicha 100 metr."
    },
    {
        id: "net_2_5",
        level: 2,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        image: "assets/diagrams/bus_topology.svg",
        question: "Barcha kompyuterlar yagona umumiy magistral kabelga ketma-ket ulangan topologiya nima deyiladi?",
        options: ["Shina (Bus) topologiyasi","Yulduz (Star)","Halqa (Ring)","Daraxt (Tree)"],
        correct: 0,
        explanation: "Shina topologiyasida barcha qurilmalar bitta umumiy aloqa liniyasiga ulanadi, magistralning ikki uchida terminatorlar o'rnatiladi.",
        expertHint: "Shina (Bus) topologiyasi."
    },
    {
        id: "net_2_6",
        level: 2,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Kompyuterni tarmoq kabeliga yoki simsiz tarmoqqa ulash uchun mas'ul bo'lgan apparat platasi nima deb ataladi?",
        options: ["Tarmoq kartasi (NIC - Network Interface Card)","Videokarta","Ovoz kartasi","Operativ xotira (RAM)"],
        correct: 0,
        explanation: "NIC (tarmoq interfeys platasi) apparat darajasida fizik ulanishni va MAC manzilni ta'minlovchi asosiy qismdir.",
        expertHint: "Tarmoq kartasi (NIC)."
    },
    {
        id: "net_2_7",
        level: 2,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Eskirgan Xab (Hub) qurilmasi zamonaviy Kommutatordan (Switch) nimasi bilan salbiy farqlanadi?",
        options: ["Hub barcha kelgan signallarni barcha portlarga ko'r-ko'rona tarqatadi, Switch esa faqat qabul qiluvchi manzilga yo'naltiradi","Hub faqat optik tolada ishlaydi","Hub juda qimmat turadi","Hub parollarni shifrlamaydi"],
        correct: 0,
        explanation: "Hub multiportli oddiy takrorlagich (repeater) bo'lib, hamma portga ommaviy yuboradi va kolliziyalarga sabab bo'ladi. Switch esa aqlli bo'lib, freymni faqat kerakli portga uzatadi.",
        expertHint: "Hub barcha portlarga ko'r-ko'rona yuboradi va kolliziyalar keltirib chiqaradi."
    },
    {
        id: "net_2_8",
        level: 2,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        image: "assets/diagrams/star_topology.svg",
        question: "Markaziy kommutator atrofida barcha kompyuterlar alohida kabellar bilan ulangan eng keng tarqalgan zamonaviy topologiya qaysi?",
        options: ["Yulduz (Star) topologiyasi","Shina topologiyasi","Halqa topologiyasi","To'r (Mesh)"],
        correct: 0,
        explanation: "Bugungi kunda deyarli barcha ofis va xonadon tarmoqlari markaziy Switch yoki Routerga nurlar kabi ulangan Yulduz topologiyasida qurilgan.",
        expertHint: "Yulduz (Star) topologiyasi."
    },
    {
        id: "net_3_1",
        level: 3,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Sayt nomlarini (masalan, google.com) raqamli IP manzilga aylantiruvchi tizim qaysi?",
        options: ["DNS (Domain Name System)","DHCP","FTP","SNMP"],
        correct: 0,
        explanation: "DNS inson o'qiydigan domen nomlarini kompyuterlar tushunadigan IP manzilga o'giradi.",
        expertHint: "Domen nomlarini IP ga aylantirish bu DNS xizmati."
    },
    {
        id: "net_3_2",
        level: 3,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Kommutator (Switch) OSI modelining qaysi sathida ishlaydi va nimaga asoslanib freymlarni uzatadi?",
        options: ["2-sath (Data Link / Kanal sathi) — MAC manzillar asosida","3-sath (Network / Tarmoq sathi) — IP manzillar asosida","1-sath (Physical / Jismoniy sath) — bitlar asosida","4-sath (Transport sathi) — portlar asosida"],
        correct: 0,
        explanation: "Klassik Layer 2 Switch kanal sathida ishlaydi va o'zining MAC jadvaliga (CAM table) tayanib paketlarni kerakli portga yo'naltiradi.",
        expertHint: "2-sath (Data Link) va MAC manzillar."
    },
    {
        id: "net_3_3",
        level: 3,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "IP manzilni unga mos keluvchi fizik MAC manzilga bog'lash uchun qaysi protokol xizmat qiladi?",
        options: ["ARP (Address Resolution Protocol)","RARP","ICMP","SNMP"],
        correct: 0,
        explanation: "ARP protokoli mahalliy tarmoqda ma'lum IP manzil egasi bo'lgan qurilmaning jismoniy MAC manzilini aniqlash uchun ishlatiladi.",
        expertHint: "ARP (Address Resolution Protocol)."
    },
    {
        id: "net_3_4",
        level: 3,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "MAC manzil odatda qaysi sanoq sistemasida va qanday formatda yoziladi?",
        options: ["O'n oltilik (HEX) sistemasida, 12 ta belgidan iborat (masalan: 00:1A:2B:3C:4D:5E)","Faqat 0 va 1 lardan iborat ikkilik","Faqat o'nlik butun sonlar","Lotin harflaridan iborat so'zlar"],
        correct: 0,
        explanation: "MAC manzil 48 bit bo'lib, qulaylik uchun 6 ta juftlikdagi o'n oltilik sonlar (HEX) orqali, ikki nuqta yoki tire bilan yoziladi.",
        expertHint: "16-lik sanoq sistemasida: 00:1A:2B:3C:4D:5E."
    },
    {
        id: "net_3_5",
        level: 3,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Tarmoqdagi barcha qurilmalarga mo'ljallangan umumiy Broadcast MAC manzili qanday ko'rinishda bo'ladi?",
        options: ["FF:FF:FF:FF:FF:FF","00:00:00:00:00:00","127.0.0.1","255.255.255.255"],
        correct: 0,
        explanation: "Barcha 48 biti 1 ga teng bo'lgan FF:FF:FF:FF:FF:FF manzili lokal tarmoqdagi barcha xostlarga yo'naltirilgan ommaviy efir manzilidir.",
        expertHint: "FF:FF:FF:FF:FF:FF."
    },
    {
        id: "net_3_6",
        level: 3,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Standart Ethernet freymida maksimal uzatish birligi (MTU - Maximum Transmission Unit) necha baytga teng?",
        options: ["1500 bayt","64 bayt","4096 bayt","1024 bayt"],
        correct: 0,
        explanation: "Klassik Ethernet tarmoqlarida MTU o'lchami standart 1500 bayt qilib belgilangan.",
        expertHint: "Standart MTU 1500 bayt."
    },
    {
        id: "net_3_7",
        level: 3,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Kolliziya domeni (Collision Domain) deganda nima tushuniladi?",
        options: ["Bir vaqtda ikkita qurilma signal yuborganida signallar to'qnashuvi yuz berishi mumkin bo'lgan tarmoq qismi","Faqat virus tarqaladigan kompyuterlar","Routerlar joylashgan xona","Domen nomlari ro'yxati"],
        correct: 0,
        explanation: "Kolliziya domeni umumiy sim orqali to'qnashuv xavfi bo'lgan segmentdir. Har bir Switch porti alohida kolliziya domeni yaratadi.",
        expertHint: "Signallar to'qnashishi mumkin bo'lgan tarmoq segmenti."
    },
    {
        id: "net_4_1",
        level: 4,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Tarmoqdagi qurilmalarga avtomatik ravishda dinamik IP manzil beruvchi protokol qaysi?",
        options: ["HTTP","DHCP","ARP","SSH"],
        correct: 1,
        explanation: "DHCP (Dynamic Host Configuration Protocol) yangi ulangan qurilmalarga avtomatik tarzda IP parametrlarini beradi.",
        expertHint: "Avtomatik IP ulash protokoli bu DHCP."
    },
    {
        id: "net_4_2",
        level: 4,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "C sinfidagi standart IPv4 tarmog'ining standart tarmoq maskasi qanday ko'rinishda bo'ladi?",
        options: ["255.255.255.0 (/24)","255.0.0.0 (/8)","255.255.0.0 (/16)","255.255.255.255 (/32)"],
        correct: 0,
        explanation: "C sinfidagi tarmoqlarda dastlabki 24 bit tarmoq identifikatori bo'lib, standart maskasi 255.255.255.0 hisoblanadi va 254 ta xostga imkon beradi.",
        expertHint: "255.255.255.0 yoki /24 prefiksi."
    },
    {
        id: "net_4_3",
        level: 4,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "IPv4 da 127.0.0.1 maxsus IP manzili qanday vazifa uchun ajratilgan?",
        options: ["Loopback (o'z-o'ziga murojaat qilish / localhost testi uchun)","Global internet shlyuzi uchun","Tarmoqdagi barcha kompyuterlarga ommaviy xabar yuborish uchun","Faqat simsiz Wi-Fi routerlar uchun"],
        correct: 0,
        explanation: "127.0.0.1 manzili localhost bo'lib, operatsion tizimning tarmoq drayveri va protokollar to'plamini mahalliy sinash uchun xizmat qiladi.",
        expertHint: "Loopback / localhost manzili."
    },
    {
        id: "net_4_4",
        level: 4,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "IPv4 manzili nechta oktetdan (baytdan) tashkil topgan bo'ladi?",
        options: ["4 ta oktet (nuqtalar bilan ajratilgan 4 ta son)","2 ta oktet","8 ta oktet","16 ta oktet"],
        correct: 0,
        explanation: "IPv4 32 bitli bo'lib, 8 bitdan iborat 4 ta oktetga bo'linadi (masalan: 192.168.1.1).",
        expertHint: "4 ta oktet (masalan, 192.168.1.1)."
    },
    {
        id: "net_4_5",
        level: 4,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Lokal tarmoqlar uchun ajratilgan quyidagi IP manzillardan qaysi biri xususiy (Private IP) hisoblanadi?",
        options: ["192.168.1.100","8.8.8.8","1.1.1.1","142.250.185.206"],
        correct: 0,
        explanation: "192.168.0.0 - 192.168.255.255 diapazoni RFC 1918 standarti bo'yicha global Internetda marshrutlanmaydigan xususiy (lokal) manzillardir.",
        expertHint: "192.168.x.x lokal xususiy IP hisoblanadi."
    },
    {
        id: "net_4_6",
        level: 4,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Har bir IP manzil o'z ichida mantiqiy jihatdan qaysi ikki qismga bo'linadi?",
        options: ["Tarmoq identifikatori (Network ID) va Xost identifikatori (Host ID)","Foydalanuvchi nomi va parol","Server va Klient qismlari","Kabel va Wi-Fi qismlari"],
        correct: 0,
        explanation: "Tarmoq maskasi yordamida IP manzil tarmoq raqami (Network ID) hamda o'sha tarmoq ichidagi aniq qurilma raqamiga (Host ID) ajratiladi.",
        expertHint: "Network ID va Host ID."
    },
    {
        id: "net_4_7",
        level: 4,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Tarmoq maskasi 255.255.255.0 (/24) bo'lgan bitta quyi tarmoqda ko'pi bilan nechta kompyuterga (xostga) haqiqiy IP berish mumkin?",
        options: ["254 ta xostga","256 ta xostga","100 ta xostga","512 ta xostga"],
        correct: 0,
        explanation: "2^8 = 256 ta manzildan dastlabkisi tarmoq manzili, oxirgisi (255) broadcast bo'lgani sababli foydalanish mumkin bo'lgan xostlar soni 256 - 2 = 254 tadir.",
        expertHint: "256 - 2 = 254 ta xost."
    },
    {
        id: "net_5_1",
        level: 5,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Xavfsiz va shifrlangan veb-aloqani ta'minlovchi HTTPS protokoli odatda qaysi portdan foydalanadi?",
        options: ["80-port","21-port","443-port","22-port"],
        correct: 2,
        explanation: "Oddiy HTTP 80-portda, shifrlangan xavfsiz HTTPS esa 443-portda ishlaydi.",
        expertHint: "Xavfsiz HTTPS protokoli 443-portdan foydalanadi."
    },
    {
        id: "net_5_2",
        level: 5,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "TCP protokolida ishonchli aloqa seansini o'rnatish jarayoni nima deb ataladi?",
        options: ["Three-Way Handshake (Uch bosqichli qo'l siqish: SYN, SYN-ACK, ACK)","Fast Connect","Four-Way Termination","Ping-Pong Handshake"],
        correct: 0,
        explanation: "TCP ulanish mijoz SYN yuborishi, server SYN-ACK bilan javob qaytarishi va mijoz ACK tasdig'ini yuborishi orqali ishonchli o'rnatiladi.",
        expertHint: "Three-Way Handshake (SYN, SYN-ACK, ACK)."
    },
    {
        id: "net_5_3",
        level: 5,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "DNS so'rovlari va videokonferensiya oqimlari nima sababdan asosan UDP protokolini afzal ko'radi?",
        options: ["Minimal kechikish (overhead) talab qilingani va aloqa o'rnatish uchun ortiqcha vaqt yo'qotmaslik uchun","UDP ma'lumotlarni kuchliroq shifrlagani uchun","UDP faqat simsiz tarmoqlarda ishlagani uchun","UDP da yo'qolgan paketlar qayta yuborilgani uchun"],
        correct: 0,
        explanation: "UDP yengil va ulanish o'rnatmasdan ishlaydigan protokol bo'lib, uning sarlavhasi bor-yo'g'i 8 bayt va kechikishlarni minimal qiladi.",
        expertHint: "Tezkor va ortiqcha ulanish kechikishisiz ishlagani uchun."
    },
    {
        id: "net_5_4",
        level: 5,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "TCP/IP modelida port raqamlari maksimal nechagacha bo'lishi mumkin?",
        options: ["65535 gacha (16 bit)","255 gacha","1024 gacha","1 000 000 gacha"],
        correct: 0,
        explanation: "Port maydoni 16 bit bilan kodlanadi, shuning uchun 0 dan 65535 gacha bo'lgan jami 65536 ta port mavjud.",
        expertHint: "65535 gacha (16 bit)."
    },
    {
        id: "net_5_5",
        level: 5,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Standart xizmatlar uchun ajratilgan mashhur 'Well-Known Ports' diapazoni qaysi oraliqni o'z ichiga oladi?",
        options: ["0 dan 1023 gacha","1024 dan 49151 gacha","49152 dan 65535 gacha","Faqat 80 va 443"],
        correct: 0,
        explanation: "IANA tomonidan 0 dan 1023 gacha bo'lgan portlar tizim va xalqaro mashhur xizmatlar (HTTP, SSH, DNS va boshqalar) uchun rasman band qilingan.",
        expertHint: "0 dan 1023 gacha."
    },
    {
        id: "net_5_6",
        level: 5,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "UDP protokolining sarlavhasi (header) nechta baytdan iborat bo'lib, uning yengilligini ta'minlaydi?",
        options: ["Aynan 8 baytdan","20 baytdan","64 baytdan","128 baytdan"],
        correct: 0,
        explanation: "UDP sarlavhasi bor-yo'g'i 4 ta maydondan (Source Port, Dest Port, Length, Checksum) iborat bo'lib, jami 8 bayt joy egallaydi.",
        expertHint: "Bor-yo'g'i 8 bayt."
    },
    {
        id: "net_5_7",
        level: 5,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "TCP protokolida qabul qiluvchi tomonning buferi to'lib ketmasligi uchun qaysi mexanizm qo'llaniladi?",
        options: ["Oqimni boshqarish va toymasin oyna (Sliding Window / Flow Control)","Kabelni uzish","Tezlikni nolga tushirish","Paketlarni tashlab yuborish"],
        correct: 0,
        explanation: "TCP Sliding Window mexanizmi orqali qabul qiluvchi o'zining qabul qilish oynasi (Window Size) hajmini xabar qilib, ma'lumot oqimini tartibga soladi.",
        expertHint: "Sliding Window (toymasin oyna) va Flow Control."
    },
    {
        id: "net_6_1",
        level: 6,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "TCP va UDP protokollari o'rtasidagi asosiy farq nimada?",
        options: ["TCP kafolatlangan ulanishga ega, UDP esa tezkor ammo kafolatsiz","UDP xavfsizroq, TCP eskirgan","TCP faqat kabelli tarmoqda ishlaydi","Hech qanday farqi yo'q"],
        correct: 0,
        explanation: "TCP ulanish o'rnatib paketlar yetib borishini tekshiradi; UDP esa qo'shimcha tasdiqsiz tez uzatadi.",
        expertHint: "TCP - ishonchli va kafolatli, UDP - o'yin va video uchun tezkor."
    },
    {
        id: "net_6_2",
        level: 6,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Standart HTTP veb-trafigi uchun qaysi tarmoq porti standart hisoblanadi?",
        options: ["Port 80","Port 443","Port 21","Port 25"],
        correct: 0,
        explanation: "Shifrlanmagan HTTP so'rovlari uchun 80-port, himoyalangan HTTPS uchun 443-port standart qabul qilingan.",
        expertHint: "Standart HTTP uchun 80-port."
    },
    {
        id: "net_6_3",
        level: 6,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Serverlarni masofadan xavfsiz matnli buyruqlar orqali boshqarish uchun qaysi protokol va port ishlatiladi?",
        options: ["SSH (Secure Shell) — Port 22","Telnet — Port 23","FTP — Port 21","RDP — Port 3389"],
        correct: 0,
        explanation: "SSH shifrlangan masofaviy terminal protokoli bo'lib, standart holda 22-portda ishlaydi (ochiq matn uzatuvchi eskirgan Telnet o'rniga).",
        expertHint: "SSH va uning 22-porti."
    },
    {
        id: "net_6_4",
        level: 6,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Internetda elektron pochta xabarlarini pochta serveriga YUBORISH uchun qaysi protokol ishlatiladi?",
        options: ["SMTP (Simple Mail Transfer Protocol) — Port 25","POP3 — Port 110","IMAP — Port 143","SNMP — Port 161"],
        correct: 0,
        explanation: "Elektron xatlarni jo'natish uchun SMTP ishlatiladi (POP3 va IMAP esa xatlarni pochta qutisidan o'qib olish uchundir).",
        expertHint: "SMTP (Port 25)."
    },
    {
        id: "net_6_5",
        level: 6,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Xatlarni serverda saqlagan holda bir vaqtning o'zida bir nechta qurilmadan qulay o'qish imkonini beruvchi pochta protokoli qaysi?",
        options: ["IMAP (Internet Message Access Protocol) — Port 143","POP3","SMTP","Telnet"],
        correct: 0,
        explanation: "IMAP xatlarni serverda sinxron holda saqlaydi, natijada telefon, kompyuter va brauzerdan bir vaqtda kirib o'qish mumkin bo'ladi.",
        expertHint: "IMAP protokoli."
    },
    {
        id: "net_6_6",
        level: 6,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Tarmoq orqali katta hajmdagi fayllarni serverga yuklash va yuklab olish uchun an'anaviy qaysi protokol qo'llanilgan?",
        options: ["FTP (File Transfer Protocol) — Port 20 va 21","DNS","NTP","DHCP"],
        correct: 0,
        explanation: "FTP fayllarni uzatishning klassik protokoli bo'lib, 21-portda buyruqlarni boshqaradi, 20-portda esa ma'lumotlar oqimini uzatadi.",
        expertHint: "FTP (File Transfer Protocol)."
    },
    {
        id: "net_7_1",
        level: 7,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Tarmoq kartasining zavoddan berilgan jismoniy 48-bitli o'zgarmas manzili nima?",
        options: ["IP manzil","MAC manzil","Port raqami","SSID"],
        correct: 1,
        explanation: "MAC (Media Access Control) apparat darajasidagi 48 bitlik yagona jismoniy manzildir.",
        expertHint: "Tarmoq kartasining doimiy apparat manzili - bu MAC manzil."
    },
    {
        id: "net_7_2",
        level: 7,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Tarmoq sozlamalaridagi 'Default Gateway' (Asosiy shlyuz) nima uchun xizmat qiladi?",
        options: ["Lokal tarmoqdan tashqarida (boshqa tarmoqlarda yoki Internetda) joylashgan manzillarga chiqish uchun","Kompyuterni elektr quvvati bilan ta'minlash uchun","Faqat printerlarni qidirish uchun","Mahalliy kompyuterlarga nom berish uchun"],
        correct: 0,
        explanation: "Default Gateway odatda routerning lokal IP manzili bo'lib, tashqi tarmoqlarga yuboriladigan barcha paketlar router orqali yo'naltiriladi.",
        expertHint: "Mahalliy tarmoqdan tashqariga chiqish eshigi (router)."
    },
    {
        id: "net_7_3",
        level: 7,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Tarmoq aloqasini tekshirishda ishlatiladigan mashhur 'ping' buyrug'i qaysi protokol orqali ishlaydi?",
        options: ["ICMP (Internet Control Message Protocol)","IGMP","SMTP","BGP"],
        correct: 0,
        explanation: "Ping vositasi ICMP Echo Request va Echo Reply xabarlarini yuborish va qabul qilish orqali masofadagi qurilmaning mavjudligi va kechikishini o'lchaydi.",
        expertHint: "ICMP protokoli."
    },
    {
        id: "net_7_4",
        level: 7,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "IP paket sarlavhasidagi TTL (Time to Live) maydonining eng asosiy vazifasi nimadan iborat?",
        options: ["Paketlarning tarmoqda aylanma halqada (routing loop) cheksiz aylanib qolishining oldini olish","Paket tezligini 2 barobar oshirish","Foydalanuvchi vaqtini hisoblash","Paketni shifrlash"],
        correct: 0,
        explanation: "Har bir routerdan o'tganda TTL 1 ga kamayadi. Agar TTL=0 bo'lsa, paket yo'q qilinadi va tarmoq ortiqcha tiqilinchlardan qutqariladi.",
        expertHint: "Paketning cheksiz aylanib qolishini to'xtatish."
    },
    {
        id: "net_7_5",
        level: 7,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Paket manzilga yetib borguncha qaysi oraliq routerlardan o'tganligini va kechikish vaqtini ko'rsatuvchi vosita qaysi?",
        options: ["traceroute (Windows da tracert)","ipconfig","netstat","arp -a"],
        correct: 0,
        explanation: "traceroute vositasi TTL parametrini 1 dan boshlab bosqichma-bosqich oshirish orqali manzilgacha bo'lgan barcha routerlar yo'nalishini aniqlaydi.",
        expertHint: "traceroute yoki tracert."
    },
    {
        id: "net_7_6",
        level: 7,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Statik marshrutlashning dinamik marshrutlashdan (OSPF, RIP) asosiy farqi nimada?",
        options: ["Statik marshrutlar tarmoq ma'muri tomonidan qo'lda kiritiladi va avtomatik ravishda o'zgarmaydi","Statik marshrutlar har soniyada o'zgaradi","Statik marshrut faqat sun'iy yo'ldoshda ishlaydi","Hech qanday farqi yo'q"],
        correct: 0,
        explanation: "Statik marshrutlash xavfsiz va aniq bo'lib, administrator tomonidan qo'lda sozlanadi, biroq tarmoq uzilsa avtomatik aylanib o'tish yo'lini topa olmaydi.",
        expertHint: "Administrator tomonidan qo'lda kiritiladi."
    },
    {
        id: "net_8_1",
        level: 8,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Kanal sathida MAC manzillar jadvali asosida freymlarni aniq portga uzatuvchi qurilma qaysi?",
        options: ["Kommutator (Switch)","Hub (Konsentrator)","Oddiy sim","Modem"],
        correct: 0,
        explanation: "Switch OSI ning 2-qatlamida ishlaydi va o'zining MAC jadvali orqali paketlarni faqat kerakli portga yo'naltiradi.",
        expertHint: "MAC manzillar bilan aqlli ishlovchi qurilma - Switch (kommutator)."
    },
    {
        id: "net_8_2",
        level: 8,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "DNS (Domain Name System) ning asosiy global vazifasi nimadan iborat?",
        options: ["Odam tushunadigan domen nomlarini (masalan, tuit.uz) kompyuter tushunadigan raqamli IP manzillarga o'zgartirish","Fayllarni siqib arxivlash","Elektr tarmoqlaridagi voltajni tekshirish","Parollarni shifrlash"],
        correct: 0,
        explanation: "DNS xuddi telefon ma'lumotnomasi kabi ishlab, domen nomlarini tegishli serverning IP manziliga aylantirib beradi.",
        expertHint: "Domen nomini IP manzilga aylantirish."
    },
    {
        id: "net_8_3",
        level: 8,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "NAT (Network Address Translation) texnologiyasi nima uchun yaratilgan va keng qo'llaniladi?",
        options: ["Mahalliy tarmoqdagi ko'plab xususiy (private) IP larni bitta tashqi umumiy (public) IP orqali Internetga chiqarish va IPv4 manzillar tanqisligini yumshatish uchun","Internet tezligini 10 barobarga oshirish uchun","Faqat optik tolali kabellarni ulash uchun","Serverlarni fizik sovutish uchun"],
        correct: 0,
        explanation: "NAT xususiy (192.168.x.x, 10.x.x.x) IP larni bitta umumiy global IP ga o'zgartirib, IPv4 manzillarni tejaydi.",
        expertHint: "Xususiy ichki IP larni bitta tashqi IP orqali Internetga chiqarish."
    },
    {
        id: "net_9_1",
        level: 9,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Mantiqiy IP manzilga mos keluvchi fizik MAC manzilni topib beruvchi protokol qaysi?",
        options: ["RARP","ARP (Address Resolution Protocol)","ICMP","IGMP"],
        correct: 1,
        explanation: "ARP protokoli mahalliy tarmoqda ma'lum IP manzilga qaysi MAC to'g'ri kelishini so'rov orqali aniqlaydi.",
        expertHint: "IP dan MAC ga o'tish protokoli bu ARP."
    },
    {
        id: "net_9_2",
        level: 9,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "STP (Spanning Tree Protocol) tarmog'ida kommutatorlar o'rtasida qanday halokatli hodisaning oldini oladi?",
        options: ["Broadcast bo'ronlari va zanjirli cheksiz halqalarning (Switching Loops) paydo bo'lishini","Kabel uzilib ketishini","Server xotirasi to'lib qolishini","IP manzillarning tugashini"],
        correct: 0,
        explanation: "STP ortiqcha (redundant) zanjirlarni avtomatik bloklab, paketlarning cheksiz aylanib broadcast bo'roniga sabab bo'lishining oldini oladi.",
        expertHint: "Cheksiz aylanma halqalar (switching loop) paydo bo'lishini to'xtatadi."
    },
    {
        id: "net_9_3",
        level: 9,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Kommutatorning 'Trunk' porti oddiy 'Access' portidan qaysi asosiy jihati bilan farqlanadi?",
        options: ["Trunk porti bitta kabel orqali bir vaqtning o'zida bir nechta VLAN teglariga ega traflikni o'tkaza oladi","Trunk faqat Wi-Fi signallarini qabul qiladi","Trunk porti faqat elektr quvvatini uzatadi","Trunk porti IP manzilga ega bo'lmaydi"],
        correct: 0,
        explanation: "Access port faqat bitta VLAN ga tegishli oxirgi qurilmani ulasa, Trunk porti (802.1Q) kommutatorlar orasida bir nechta VLAN trafigini teglar bilan uzatadi.",
        expertHint: "Bir nechta VLAN trafigini o'tkazish imkoniyati."
    },
    {
        id: "net_10_1",
        level: 10,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "192.168.1.0/24 subnetida foydalanish mumkin bo'lgan maksimal kompyuterlar (xostlar) soni nechta?",
        options: ["256 ta","254 ta","255 ta","128 ta"],
        correct: 1,
        explanation: "/24 maskasida jami 256 ta manzil bor. Tarmoq (.0) va broadcast (.255) ajratilgach, xostlar uchun 254 ta qoladi.",
        expertHint: "256 dan 2 ta xizmat manzilini ayirsa 254 ta xost qoladi."
    },
    {
        id: "net_10_2",
        level: 10,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "RIP (Routing Information Protocol) marshrutlash protokoli yo'l sifatini baholash uchun qaysi metrikadan foydalanadi?",
        options: ["Hop Count (oraliq routerlar/sakrashlar soni, maksimal 15)","Kanal o'tkazuvchanlik qobiliyati (Bandwidth)","Paket kechikishi (Latency)","Kabel uzunligi (metrlarda)"],
        correct: 0,
        explanation: "RIP faqat sakrashlar (hop) soniga qaraydi va 16 ta hop cheksiz deb hisoblanib, marshrut o'chiriladi.",
        expertHint: "Hop count (sakrashlar soni)."
    },
    {
        id: "net_10_3",
        level: 10,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Cisco kompaniyasi tomonidan yaratilgan, masofa vektori va kanal holati afzalliklarini birlashtirgan gibrid marshrutlash protokoli qaysi?",
        options: ["EIGRP (Enhanced Interior Gateway Routing Protocol)","IS-IS","BGP","OSPF"],
        correct: 0,
        explanation: "EIGRP Cisco ning gibrid protokoli bo'lib, DUAL algoritmidan foydalanadi va tez konvergentsiya beradi.",
        expertHint: "EIGRP protokoli."
    },
    {
        id: "net_11_1",
        level: 11,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Tarmoq aloqasini tekshirish uchun ishlatiladigan 'ping' buyrug'i qaysi protokolga tayanadi?",
        options: ["TCP","UDP","ICMP (Internet Control Message Protocol)","IGMP"],
        correct: 2,
        explanation: "Ping vositasi ICMP protokolining Echo Request va Echo Reply xabarlaridan foydalanadi.",
        expertHint: "Ping yuborilganda ICMP protokoli ishlaydi."
    },
    {
        id: "net_11_2",
        level: 11,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Global Internet miqyosida turli Avtonom Tizimlar (AS - Autonomous Systems) o'rtasida tashqi marshrutlashni qaysi protokol amalga oshiradi?",
        options: ["BGP (Border Gateway Protocol)","OSPF","RIP","EIGRP"],
        correct: 0,
        explanation: "BGP butun jahon Internet tarmog'ini ushlab turuvchi de-fakto yagona tashqi Gateway (EGP) marshrutlash protokolidir.",
        expertHint: "BGP (Border Gateway Protocol)."
    },
    {
        id: "net_11_3",
        level: 11,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "IPv6 da IPv4 dagi samarasiz ommaviy xabar tarqatish (Broadcast) mexanizmi o'rniga qaysi uzatish turlaridan foydalaniladi?",
        options: ["Multicast va Anycast","Faqat Unicast","Radio to'lqinli tarqatish","Faqat peer-to-peer"],
        correct: 0,
        explanation: "IPv6 da Broadcast butunlay bekor qilingan, uning o'rniga guruhli Multicast va eng yaqin manzilga yo'naltiriluvchi Anycast joriy qilingan.",
        expertHint: "Multicast va Anycast."
    },
    {
        id: "net_12_1",
        level: 12,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Global Internetda avtonom tizimlar (AS) o'rtasida yo'naltirishni ta'minlovchi asosiy tashqi protokol qaysi?",
        options: ["BGP (Border Gateway Protocol)","OSPF","RIP","EIGRP"],
        correct: 0,
        explanation: "BGP butun jahon Internet tarmog'ida provayderlar va avtonom tizimlar orasidagi asosiy marshrutizatsiyani amalga oshiradi.",
        expertHint: "Global internet tayanchi - BGP protokoli."
    },
    {
        id: "net_12_2",
        level: 12,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "TLS/HTTPS xavfsiz ulanishda nima sababdan bir vaqtda asimmetrik (RSA/ECC) va simmetrik (AES) shifrlash birgalikda qo'llaniladi?",
        options: ["Asimmetrik shifrlash faqat maxfiy kalitni xavfsiz almashish uchun, simmetrik shifrlash esa katta hajmli traflikni tezkor shifrlash uchun ishlatiladi","Chunki simmetrik shifrlash hech qachon buzilmaydi","Faqat mobil telefonlarda ishlashi uchun","Bu xatolik bo'lib, aslida faqat bittasi ishlatiladi"],
        correct: 0,
        explanation: "Asimmetrik kriptografiya sekin bo'lgani sababli faqat dastlabki sessiya kalitini uzatishga xizmat qiladi, real ma'lumotlar oqimi esa apparat darajasida tezkor AES simmetrik kalit bilan shifrlanadi.",
        expertHint: "Kalit almashish uchun asimmetrik, trafikni tezkor shifrlash uchun simmetrik."
    },
    {
        id: "net_12_3",
        level: 12,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Tarmoq arxitekturasida DMZ (Demilitarized Zone) deb qanday zonaga aytiladi?",
        options: ["Tashqi Internet foydalanuvchilariga xizmat ko'rsatuvchi serverlar (veb, pochta) ichki korporativ tarmoqdan izolyatsiya qilingan oraliq xavfsizlik segmenti","Faqat harbiy obyektlarning aloqa tarmog'i","Parolsiz kiriladigan bepul Wi-Fi zonasi","Antivirus o'rnatilmagan kompyuterlar xonasi"],
        correct: 0,
        explanation: "DMZ bu ochiq serverlar joylashtiriladigan bufer zona bo'lib, unga hujum qilingan taqdirda ham ichki maxfiy LAN tarmog'i himoyalangan qoladi.",
        expertHint: "Ochiq serverlar joylashgan bufer xavfsizlik zonasi."
    },
    {
        id: "net_13_1",
        level: 13,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Bitta kommutatorda bir nechta mantiqiy ajratilgan virtual tarmoqlar yaratish texnologiyasi nima?",
        options: ["VPN","VLAN (Virtual Local Area Network)","NAT","Proxy"],
        correct: 1,
        explanation: "VLAN (Virtual LAN) kommutator portlarini mantiqiy guruhlarga ajratib, tarmoq xavfsizligi va unumdorligini oshiradi.",
        expertHint: "Virtual lokal tarmoq bu VLAN texnologiyasi."
    },
    {
        id: "net_13_2",
        level: 13,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "5G mobil tarmoqlarining asosiy 3 ta ustunidan biri bo'lgan URLLC qisqartmasi nimani anglatadi?",
        options: ["Ultra-Reliable Low-Latency Communication (O'ta ishonchli va o'ta past kechikishli aloqa)","Universal Radio Link Control","Ultra Rapid Local Line Circuit","Unified Routing Line Center"],
        correct: 0,
        explanation: "URLLC avtonom transportlar va masofaviy jarrohlik kabi 1 millisekunddan kam kechikish va 99.999% ishonchlilik talab qiluvchi tizimlar uchun 5G standartidir.",
        expertHint: "Ultra-Reliable Low-Latency Communication."
    },
    {
        id: "net_13_3",
        level: 13,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Simsiz Wi-Fi tarmoqlarida axborot to'qnashuvlarining oldini olish uchun qaysi kirish mexanizmi qo'llaniladi?",
        options: ["CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)","CSMA/CD (Collision Detection)","Token Ring","ALOHA"],
        correct: 0,
        explanation: "Wi-Fi efirida to'qnashuvni eshitib aniqlash qiyin bo'lgani sababli, to'qnashuvni oldindan oldini oluvchi CSMA/CA (ACK va RTS/CTS) mexanizmi qo'llanadi.",
        expertHint: "CSMA/CA (Collision Avoidance - to'qnashuvni chetlab o'tish)."
    },
    {
        id: "net_14_1",
        level: 14,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Ichki lokal xususiy IP manzillarni bitta tashqi global IP ga o'zgartirib Internetga ulovchi texnologiya nima?",
        options: ["DNS","DHCP","NAT (Network Address Translation)","QoS"],
        correct: 2,
        explanation: "NAT lokal tarmoqdagi qurilmalarni bitta umumiy tashqi IP orqali Internetga chiqarishga xizmat qiladi.",
        expertHint: "Lokal IP larni global IP ga o'giruvchi mexanizm - bu NAT."
    },
    {
        id: "net_14_2",
        level: 14,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Dasturiy boshqariladigan tarmoqlarda (SDN) kontroller va kommutatorlar o'rtasida keng tarqalgan standart ochiq interfeys protokoli qaysi?",
        options: ["OpenFlow","SNMPv1","NetBIOS","Telnet"],
        correct: 0,
        explanation: "OpenFlow protokoli SDN kontrollerga tarmoq kommutatorlarining oqim jadvallarini (flow tables) to'g'ridan-to'g'ri dasturiy dasturlash imkoniyatini beradi.",
        expertHint: "OpenFlow protokoli."
    },
    {
        id: "net_14_3",
        level: 14,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Tarmoqda QoS (Quality of Service) sozlashda ovozli qo'ng'iroqlar (VoIP) uchun qaysi parametrlar eng muhim kritik omil hisoblanadi?",
        options: ["Kechikish (Latency) va paketlar kechikishi tebranishi (Jitter)","Faqat fayl hajmi","Faqat IP manzilning uzunligi","Faqat kabelning rangi"],
        correct: 0,
        explanation: "Jonli ovoz uzatishda kechikish 150 ms dan oshmasligi va jitter (tebranish) minimal bo'lishi talab etiladi, aks holda ovoz uzilib qoladi.",
        expertHint: "Kechikish (latency) va jitter (tebranish)."
    },
    {
        id: "net_15_1",
        level: 15,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Bitta optik tola orqali har xil to'lqin uzunligidagi nurlar yordamida o'nlab kanallarni uzatish texnologiyasi qanday ataladi?",
        options: ["DWDM / WDM","TDM","FDM","CDMA"],
        correct: 0,
        explanation: "WDM/DWDM (Wavelength Division Multiplexing) optik tola orqali spektral zichlashtirish yordamida terabitlik tezlik beradi.",
        expertHint: "To'lqin uzunligi bo'yicha spektral multiplekslash - DWDM/WDM."
    },
    {
        id: "net_15_2",
        level: 15,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "DWDM (Dense Wavelength Division Multiplexing) texnologiyasining optik magistral tarmoqlardagi bosh maqsadi nima?",
        options: ["Yagona optik tola orqali turli to'lqin uzunliklaridagi (rangdagi) o'nlab lazer nurlarini bir vaqtda uzatib, tarmoq o'tkazuvchanligini terabitlarga yetkazish","Optik tolani elektr simiga aylantirish","Faqat kabel narxini arzonlashtirish","Optik toladagi signallarni tovushga aylantirish"],
        correct: 0,
        explanation: "DWDM yorug'lik to'lqinlarini spektral zich zichlashtirib, bitta tola orqali terabitlab axborotni yuzlab kilometrga yo'qotishsiz uzatish imkonini beradi.",
        expertHint: "Yagona tolada turli to'lqin uzunliklari orqali ulkan sig'im hosil qilish."
    },
    {
        id: "net_15_3",
        level: 15,
        category: "networks",
        categoryName: "Kompyuter tarmoqlari",
        question: "Global Internet xavfsizligiga katta tahdid soluvchi 'BGP Hijacking' hujumi qanday amalga oshiriladi?",
        options: ["Xakerlar o'zlariga tegishli bo'lmagan begona IP bloklari prefikslarini yolg'on e'lon qilib, global Internet trafigini o'z serverlariga burib yuborishi orqali","Barcha optik kabellarni jismoniy kesib tashlash orqali","DNS serverlarning elektrini o'chirish orqali","Kompyuterlarga virusli xat yuborish orqali"],
        correct: 0,
        explanation: "BGP da dastlabki autentifikatsiya bo'lmagani sababli, tajovuzkor soxta marshrutlar e'lon qilib, millionlab foydalanuvchilar trafigini o'g'irlashi mumkin.",
        expertHint: "Yolg'on BGP prefikslarini e'lon qilib trafikni noqonuniy yo'naltirish."
    },
    {
        id: "db_1_1",
        level: 1,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "SQL da jadvaldan ma'lumotlarni tanlab olish uchun qaysi asosiy operator ishlatiladi?",
        options: ["INSERT","UPDATE","SELECT","DELETE"],
        correct: 2,
        explanation: "SELECT operatori jadvaldagi ma'lumotlarni o'qib olish va ekranga chiqarish uchun ishlatiladi.",
        expertHint: "Ma'lumotlarni o'qish va tanlash bu SELECT buyrug'i."
    },
    {
        id: "db_1_2",
        level: 1,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Relyatsion ma'lumotlar bazalarida keng qo'llaniladigan SQL qisqartmasining to'liq ma'nosi nima?",
        options: ["Structured Query Language (Tuzilmaviy so'rovlar tili)","Simple Quick Language","Server Quality Logic","System Query Link"],
        correct: 0,
        explanation: "SQL (Structured Query Language) ma'lumotlar bazasini boshqarish, so'rovlar yozish va ma'lumotlarni o'zgartirish uchun standart tildir.",
        expertHint: "Structured Query Language (Tuzilmaviy so'rovlar tili)."
    },
    {
        id: "db_1_3",
        level: 1,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Relyatsion ma'lumotlar bazasi jadvalida har bir qator (satr) nima deb ataladi?",
        options: ["Yozuv (Kortej / Record / Tuple)","Atribut","Indeks","Sxema"],
        correct: 0,
        explanation: "Jadval satri bitta alohida obyekt haqidagi to'liq ma'lumotni ifodalaydi va u yozuv yoki kortej (tuple) deyiladi.",
        expertHint: "Yozuv yoki kortej (tuple)."
    },
    {
        id: "db_1_4",
        level: 1,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "MBBT qisqartmasining to'liq o'zbekcha ma'nosi qaysi javobda to'g'ri ko'rsatilgan?",
        options: ["Ma'lumotlar bazasini boshqarish tizimi (DBMS)","Matnli buyruqlar birlashgan tarmog'i","Modulli baytlar bloki texnologiyasi","Markaziy binar bazalar to'plami"],
        correct: 0,
        explanation: "MBBT (ruscha SUBD, inglizcha DBMS) bu ma'lumotlar bazasini yaratish, saqlash, boshqarish va so'rovlar bajarish dasturlar majmuasidir.",
        expertHint: "Ma'lumotlar bazasini boshqarish tizimi (DBMS)."
    },
    {
        id: "db_1_5",
        level: 1,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "SQL tilida NULL qiymat nimani bildiradi?",
        options: ["Qiymat mavjud emasligi, noma'lumligi yoki kiritilmaganligini","Raqamli 0 sonini","Bo'sh matnli qatorni (probelni)","Manfiy sonni"],
        correct: 0,
        explanation: "NULL bu 0 soni ham emas, bo'sh matn ham emas, u ma'lumotning umuman yo'qligini yoki noma'lumligini bildiruvchi maxsus holatdir.",
        expertHint: "Qiymat yo'qligi yoki noma'lumlikni bildiradi (0 emas!)."
    },
    {
        id: "db_1_6",
        level: 1,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Dunyoda eng keng tarqalgan, ochiq kodli va bepul relyatsion MBBT qaysi?",
        options: ["MySQL va PostgreSQL","Microsoft Excel","Notepad","Photoshop"],
        correct: 0,
        explanation: "MySQL va PostgreSQL butun dunyoda veb-saytlar va korporativ ilovalar uchun eng ommabop, kuchli relyatsion tizimlardir.",
        expertHint: "MySQL va PostgreSQL."
    },
    {
        id: "db_1_7",
        level: 1,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Relyatsion ma'lumotlar bazasida jadval (Table / Relation) nima?",
        options: ["Ma'lumotlarni qatorlar va ustunlar ko'rinishida tartibli saqlashning asosiy strukturasi","Faqat formulalar to'plami","Grafik chizmalar fayli","Foydalanuvchi parollari ro'yxati"],
        correct: 0,
        explanation: "Relyatsion modelda har bir obyekt turi alohida jadvallarda (qator va ustunlar kesishmasida) saqlanadi.",
        expertHint: "Qator va ustunlardan tashkil topgan asosiy tuzilma."
    },
    {
        id: "db_1_8",
        level: 1,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Jadvalli qat'iy qoidalarga bog'lanmagan, moslashuvchan noan'anaviy ma'lumotlar bazalari umumiy qanday ataladi?",
        options: ["NoSQL (Not Only SQL)","OldSQL","PlainSQL","TextBase"],
        correct: 0,
        explanation: "NoSQL relyatsion bo'lmagan, yuqori masshtablanuvchan, sxemasiz ma'lumotlar bazalari sinfidir.",
        expertHint: "NoSQL (Not Only SQL)."
    },
    {
        id: "db_2_1",
        level: 2,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Jadvaldagi har bir satrni yagona va takrorlanmas tarzda aniqlovchi kalit nima deyiladi?",
        options: ["Primary Key (Birlamchi kalit)","Foreign Key","Index","Null Key"],
        correct: 0,
        explanation: "Primary Key har bir yozuvning unikal bo'lishini kafolatlaydi va NULL qiymat olmaydi.",
        expertHint: "Asosiy takrorlanmas kalit - bu Primary Key."
    },
    {
        id: "db_2_2",
        level: 2,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Ikki jadval o'rtasida mantiqiy bog'liqlik o'rnatish va relyatsion yaxlitlikni ta'minlash uchun nima ishlatiladi?",
        options: ["Tashqi kalit (Foreign Key)","Birlamchi kalit (Primary Key)","Noyob cheklov (Unique)","Virtual ustun"],
        correct: 0,
        explanation: "Foreign Key (tashqi kalit) bir jadvaldagi ustunni boshqa jadvalning birlamchi kalitiga bog'lash uchun ishlatiladi.",
        expertHint: "Tashqi kalit (Foreign Key)."
    },
    {
        id: "db_2_3",
        level: 2,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Relyatsion jadvalda ustun (ustunlar) nima deb ataladi va nimani ifodalaydi?",
        options: ["Maydon yoki Atribut (Field / Attribute) — obyektning aniq bir xususiyatini","Kortej","Tranzaksiya","Fayl yo'li"],
        correct: 0,
        explanation: "Har bir ustun ma'lum turdagi parametr yoki xususiyatni (masalan, yoshi, ismi) bildiradi va maydon (atribut) deb yuritiladi.",
        expertHint: "Maydon yoki atribut (Attribute)."
    },
    {
        id: "db_2_4",
        level: 2,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Jadval ustuniga NOT NULL cheklovi (constraint) qo'yilsa, bu nimani talab qiladi?",
        options: ["Ushbu ustunga bo'sh (NULL) qiymat kiritish qat'iyan man etiladi","Ustunda faqat 0 raqami bo'lishini","Ustundagi qiymatlar manfiy bo'lishini","Ustun avtomatik o'chib ketishini"],
        correct: 0,
        explanation: "NOT NULL cheklovi har bir yozuvda ushbu maydon albatta to'ldirilishi shartligini qat'iy ta'minlaydi.",
        expertHint: "Bo'sh (NULL) qoldirish taqiqlanadi."
    },
    {
        id: "db_2_5",
        level: 2,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Jadvaldagi barcha qatorlarda ustun qiymati takrorlanmas (noyob) bo'lishini ta'minlovchi cheklov qaysi?",
        options: ["UNIQUE","CHECK","DEFAULT","CASCADE"],
        correct: 0,
        explanation: "UNIQUE cheklovi ustundagi har bir qiymat yagona va betakror bo'lishini kafolatlaydi (masalan, telefon raqami yoki pasport seriyasi).",
        expertHint: "UNIQUE cheklovi."
    },
    {
        id: "db_2_6",
        level: 2,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Bir nechta ustunlarning birikmasidan tashkil topgan birlamchi kalit nima deb ataladi?",
        options: ["Kompozit (murakkab) kalit","Oddiy kalit","Virtual kalit","Kuchsiz kalit"],
        correct: 0,
        explanation: "Agar bitta ustun yozuvni noyob aniqlashga yetmasa, 2 yoki undan ortiq ustunlar birgalikda Kompozit (Composite Primary Key) kalit hosil qiladi.",
        expertHint: "Kompozit (murakkab) kalit."
    },
    {
        id: "db_2_7",
        level: 2,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Relyatsion jadvalda ko'pi bilan nechta Birlamchi kalit (Primary Key) bo'lishi mumkin?",
        options: ["Aynan 1 ta","Ixtiyoriy miqdorda","Har bir ustunda bittadan","5 tagacha"],
        correct: 0,
        explanation: "Jadvalda birlamchi kalit faqat yagona (aynan 1 ta) bo'ladi, garchi u bir nechta ustundan iborat kompozit bo'lishi mumkin bo'lsa ham.",
        expertHint: "Faqat 1 ta birlamchi kalit bo'lishi mumkin."
    },
    {
        id: "db_2_8",
        level: 2,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Yangi yozuv kiritilganda qiymat berilmasa, avtomatik biror qiymatni o'rnatuvchi SQL cheklovi qaysi?",
        options: ["DEFAULT","PRIMARY","AUTO","SET"],
        correct: 0,
        explanation: "DEFAULT 'standart_qiymat' kalit so'zi parametr ko'rsatilmagan holatda avtomatik o'sha qiymatni yozib qo'yadi.",
        expertHint: "DEFAULT cheklovi."
    },
    {
        id: "db_3_1",
        level: 3,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Jadvalga yangi qator qo'shish uchun qaysi SQL operatori qo'llaniladi?",
        options: ["ADD ROW","INSERT INTO","CREATE DATA","UPDATE"],
        correct: 1,
        explanation: "Yangi yozuv kiritish: INSERT INTO jadval (ustunlar) VALUES (qiymatlar);",
        expertHint: "Yangi satr qo'shish - INSERT INTO buyrug'i."
    },
    {
        id: "db_3_2",
        level: 3,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "SQL da mavjud jadvalni uning barcha tuzilishi va ma'lumotlari bilan birga butunlay yo'q qilish buyrug'i qaysi?",
        options: ["DROP TABLE","DELETE TABLE","REMOVE TABLE","CLEAR TABLE"],
        correct: 0,
        explanation: "DROP TABLE buyrug'i jadval tuzilishini (sxemasini) hamda ichidagi barcha ma'lumotlarini butunlay o'chirib tashlaydi.",
        expertHint: "DROP TABLE buyrug'i."
    },
    {
        id: "db_3_3",
        level: 3,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Jadvaldan kerakli ma'lumotlarni o'qib olish va tanlash uchun qaysi eng asosiy SQL buyrug'i qo'llaniladi?",
        options: ["SELECT","FETCH","EXTRACT","SHOW"],
        correct: 0,
        explanation: "SELECT buyrug'i SQL tilining eng asosiy DQL (Data Query Language) operatori bo'lib, jadvallardan kerakli ustunlarni o'qiydi.",
        expertHint: "SELECT buyrug'i."
    },
    {
        id: "db_3_4",
        level: 3,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Ma'lumotlar bazasida yangi bo'sh jadval yaratish uchun qaysi DDL buyrug'i ishlatiladi?",
        options: ["CREATE TABLE","MAKE TABLE","NEW TABLE","BUILD TABLE"],
        correct: 0,
        explanation: "CREATE TABLE jadval_nomi (ustunlar va turlar...) yangi jadval sxemasini yaratuvchi standart DDL buyrug'idir.",
        expertHint: "CREATE TABLE buyrug'i."
    },
    {
        id: "db_3_5",
        level: 3,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Jadvaldagi mavjud yozuvlarning ma'lumotlarini o'zgartirish va tahrirlash uchun qaysi DML buyrug'i ishlatiladi?",
        options: ["UPDATE","CHANGE","MODIFY","REPLACE"],
        correct: 0,
        explanation: "UPDATE jadval SET ustun = yangi_qiymat WHERE shart; orqali belgilangan qatorlar yangilanadi.",
        expertHint: "UPDATE buyrug'i."
    },
    {
        id: "db_3_6",
        level: 3,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Jadvaldan ma'lum bir qatorlarni (yozuvlarni) o'chirish uchun qaysi SQL buyrug'i qo'llaniladi?",
        options: ["DELETE FROM","REMOVE FROM","CLEAR","DROP RECORD"],
        correct: 0,
        explanation: "DELETE FROM jadval WHERE shart; buyrug'i shartga mos keluvchi qatorlarni jadvaldan o'chiradi.",
        expertHint: "DELETE FROM buyrug'i."
    },
    {
        id: "db_3_7",
        level: 3,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Mavjud jadval strukturasiga yangi qo'shimcha ustun qo'shish uchun qaysi buyruq ishlatiladi?",
        options: ["ALTER TABLE ... ADD COLUMN","INSERT COLUMN","UPDATE TABLE ADD","EXTEND TABLE"],
        correct: 0,
        explanation: "ALTER TABLE mavjud jadval tuzilishini o'zgartiradi, ADD COLUMN esa unga yangi ustun qo'shadi.",
        expertHint: "ALTER TABLE ... ADD COLUMN."
    },
    {
        id: "db_4_1",
        level: 4,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "SQL so'rovida natijalarni o'sish yoki kamayish tartibida saralash uchun nima ishlatiladi?",
        options: ["GROUP BY","ORDER BY","SORT BY","FILTER BY"],
        correct: 1,
        explanation: "ORDER BY operatori ustunlar bo'yicha saralashni (ASC yoki DESC) amalga oshiradi.",
        expertHint: "Tartiblash buyrug'i ORDER BY hisoblanadi."
    },
    {
        id: "db_4_2",
        level: 4,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "SELECT so'rovida takrorlanuvchi (dublikat) qatorlarni chiqarib tashlab, faqat noyoblarini olish uchun qaysi kalit so'z ishlatiladi?",
        options: ["DISTINCT","UNIQUE","DIFFERENT","SINGLE"],
        correct: 0,
        explanation: "SELECT DISTINCT ustun_nomi FROM jadval; shaklida yozilganda barcha bir xil takroriy satrlar bittaga keltiriladi.",
        expertHint: "DISTINCT kalit so'zi."
    },
    {
        id: "db_4_3",
        level: 4,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "SQL so'rovida qatorlarni faqat ma'lum bir mantiqiy shartga qarab filtrlash qaysi band orqali yoziladi?",
        options: ["WHERE","IF","FILTER BY","CONDITION"],
        correct: 0,
        explanation: "WHERE bandi jadvaldagi har bir satrni berilgan shartga (masalan: WHERE yosh > 20) tekshirib, moslarini tanlaydi.",
        expertHint: "WHERE bandi."
    },
    {
        id: "db_4_4",
        level: 4,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "SQL da matnli ustundan ma'lum bir harflar qolipiga (shablonga) mos qidirish uchun qaysi operator ishlatiladi?",
        options: ["LIKE (masalan: LIKE 'A%')","SIMILAR","MATCHES","EQUAL"],
        correct: 0,
        explanation: "LIKE operatori % (ixtiyoriy belgilar) va _ (bitta belgi) yordamida matnli shablonlar bo'yicha qidirishni amalga oshiradi.",
        expertHint: "LIKE operatori."
    },
    {
        id: "db_4_5",
        level: 4,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Qiymat ma'lum bir diapazon (oraliq) ichida yotganligini tekshirish uchun qaysi SQL operatori qulay?",
        options: ["BETWEEN ... AND ...","INSIDE","RANGE","FROM ... TO ..."],
        correct: 0,
        explanation: "WHERE yosh BETWEEN 18 AND 25 sharti yoshning 18 dan 25 gacha (shu sonlar ham kirgan holda) oraliqda ekanligini bildiradi.",
        expertHint: "BETWEEN ... AND ... operatori."
    },
    {
        id: "db_4_6",
        level: 4,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Natijaviy qatorlarni biror ustun bo'yicha KAMAYISH tartibida (katta sondan kichigiga) saralash uchun ORDER BY oxiriga nima yoziladi?",
        options: ["DESC (Descending)","ASC (Ascending)","DOWN","BOTTOM"],
        correct: 0,
        explanation: "ORDER BY ustun DESC kamayish tartibida saralaydi (standart ASC esa o'sish tartibida saralaydi).",
        expertHint: "DESC (Descending - kamayish tartibida)."
    },
    {
        id: "db_4_7",
        level: 4,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Qiymat bir nechta ko'rsatilgan sonlar ro'yxatidan biriga teng ekanligini qisqa tekshirish operatori qaysi?",
        options: ["IN (masalan: WHERE kurs IN (1, 2, 3))","CONTAINS","HAS","OR_LIST"],
        correct: 0,
        explanation: "IN operatori bir nechta OR shartlarini ixchamlashtirib, berilgan ro'yxatdan birontasiga mos kelsa rost deb hisoblaydi.",
        expertHint: "IN operatori."
    },
    {
        id: "db_5_1",
        level: 5,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Boshqa jadvalning Birlamchi kalitiga bog'lanish uchun xizmat qiluvchi kalit qaysi?",
        options: ["Primary Key","Candidate Key","Foreign Key (Tashqi kalit)","Super Key"],
        correct: 2,
        explanation: "Foreign Key ikki jadval orasidagi relyingtsion bog'lanishni o'rnatadi.",
        expertHint: "Boshqa jadvalga yo'naltirilgan kalit - Foreign Key."
    },
    {
        id: "db_5_2",
        level: 5,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Jadvaldagi yozuvlar umumiy sonini yoki shartga mos kelgan qatorlar sonini hisoblash uchun qaysi agregat funksiya ishlatiladi?",
        options: ["COUNT()","TOTAL()","LENGTH()","ROWS()"],
        correct: 0,
        explanation: "COUNT(*) yoki COUNT(ustun) jadvaldagi satrlar sonini sanab beruvchi standart SQL agregat funksiyasidir.",
        expertHint: "COUNT() funksiyasi."
    },
    {
        id: "db_5_3",
        level: 5,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Jadvaldagi ma'lum bir raqamli ustun elementlarining umumiy yig'indisini hisoblovchi SQL funksiyasi qaysi?",
        options: ["SUM()","ADD()","SUMMARY()","PLUS()"],
        correct: 0,
        explanation: "SUM(ustun) ustundagi barcha sonli qiymatlarning arifmetik yig'indisini qaytaradi.",
        expertHint: "SUM() funksiyasi."
    },
    {
        id: "db_5_4",
        level: 5,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Jadvaldagi biror raqamli ustunning maksimal (eng katta) qiymatini topuvchi SQL funksiyasi qaysi?",
        options: ["MAX()","HIGHEST()","TOP()","PEAK()"],
        correct: 0,
        explanation: "MAX(ustun) funksiyasi tanlangan ustundagi eng katta sonli yoki alfavit bo'yicha oxirgi qiymatni qaytaradi.",
        expertHint: "MAX() funksiyasi."
    },
    {
        id: "db_5_5",
        level: 5,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Jadval ustunidagi qiymatlarning o'rtacha arifmetik qiymatini hisoblovchi agregat funksiya qaysi?",
        options: ["AVG()","AVERAGE()","MEAN()","MID()"],
        correct: 0,
        explanation: "AVG(ustun) berilgan raqamli ustundagi barcha qiymatlar yig'indisini ularning soniga bo'lib o'rtacha qiymatni hisoblaydi.",
        expertHint: "AVG() (Average) funksiyasi."
    },
    {
        id: "db_5_6",
        level: 5,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Jadvaldagi biror ustunning eng kichik (minimal) qiymatini topish uchun qaysi funksiya ishlatiladi?",
        options: ["MIN()","SMALLEST()","BOTTOM()","LEAST()"],
        correct: 0,
        explanation: "MIN(ustun) berilgan maydon bo'yicha eng kichik qiymatni aniqlaydi.",
        expertHint: "MIN() funksiyasi."
    },
    {
        id: "db_5_7",
        level: 5,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "SELECT so'rovi natijasida qaytariladigan qatorlar sonini aniq cheklash (masalan faqat dastlabki 10 tasini olish) uchun nima qo'shiladi?",
        options: ["LIMIT 10","MAXROWS 10","STOP 10","ONLY 10"],
        correct: 0,
        explanation: "LIMIT N bandi so'rov natijasidan faqat dastlabki N ta qatorni chiqaradi (sahifalashda OFFSET bilan birga ishlatiladi).",
        expertHint: "LIMIT operatori."
    },
    {
        id: "db_6_1",
        level: 6,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        image: "assets/diagrams/sql_joins_diagram.svg",
        question: "SQL da jadvaldagi satrlar sonini hisoblash uchun qaysi agregat funksiya ishlatiladi?",
        options: ["COUNT()","SUM()","TOTAL()","LENGTH()"],
        correct: 0,
        explanation: "COUNT(*) yoki COUNT(ustun) qatorlar sonini hisoblab beradi.",
        expertHint: "Sanoq funksiyasi bu COUNT()."
    },
    {
        id: "db_6_2",
        level: 6,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "LEFT JOIN (LEFT OUTER JOIN) operatorining ishlash mexanizmi qanday?",
        options: ["Chap jadvaldagi barcha qatorlarni oladi va o'ng jadvaldan mos kelganlarini qo'shadi, mos kelmaganlariga NULL qo'yadi","Faqat ikkala jadvalda ham to'liq mos kelgan yozuvlarnigina oladi","O'ng jadvaldagi barcha yozuvlarni oladi, chapdagilarni tashlab yuboradi","Faqat ikkala jadvalning kesishmasidan tashqaridagi qatorlarni oladi"],
        correct: 0,
        explanation: "LEFT JOIN chap jadvalning hamma qatorini to'liq saqlab qoladi, o'ng jadvalda mos juft topilmasa, o'ng ustunlar NULL bo'ladi.",
        expertHint: "Chap tomondagi barcha yozuvlar to'liq chiqadi."
    },
    {
        id: "db_6_3",
        level: 6,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Ikkala jadvaldagi barcha qatorlarni bir-biriga mos kelmasa ham to'liq chiqarib, mos kelmagan joylarga NULL to'ldiruvchi JOIN qaysi?",
        options: ["FULL OUTER JOIN","INNER JOIN","CROSS JOIN","NATURAL JOIN"],
        correct: 0,
        explanation: "FULL OUTER JOIN chap va o'ng jadvallarning birlashmasini beradi, moslik topilmagan tomonlar NULL bilan to'ldiriladi.",
        expertHint: "FULL OUTER JOIN (to'liq tashqi birlashtirish)."
    },
    {
        id: "db_6_4",
        level: 6,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "RIGHT JOIN (RIGHT OUTER JOIN) operatori qanday ishlaydi?",
        options: ["O'ng jadvaldagi barcha qatorlarni to'liq oladi va chap jadvaldan mos kelganlarini qo'shadi","Faqat chap jadvaldagilarni oladi","Ikkala jadvalni ham tashlab yuboradi","Faqat birinchi qatorni oladi"],
        correct: 0,
        explanation: "RIGHT JOIN o'ng jadvaldagi barcha yozuvlarni to'liq chiqaradi, chap tomonda moslik bo'lmasa NULL bo'ladi.",
        expertHint: "O'ng tomondagi jadval to'liq chiqadi."
    },
    {
        id: "db_6_5",
        level: 6,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Ikkala jadvalning Dekart ko'paytmasini (har bir qatorni har bir qatorga ulab M * N qator) hosil qiluvchi JOIN qaysi?",
        options: ["CROSS JOIN","INNER JOIN","LEFT JOIN","UNIQUE JOIN"],
        correct: 0,
        explanation: "CROSS JOIN hech qanday shartsiz birinchi jadvalning M ta qatorini ikkinchi jadvalning N ta qatori bilan to'liq kombinatsiya qiladi (M*N qator hosil bo'ladi).",
        expertHint: "CROSS JOIN (Dekart ko'paytmasi)."
    },
    {
        id: "db_6_6",
        level: 6,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Jadvallarni birlashtirishda JOIN shartini ko'rsatish uchun qaysi kalit so'z ishlatiladi?",
        options: ["ON (masalan: ON j1.id = j2.user_id)","WITH","LINK","EQUAL"],
        correct: 0,
        explanation: "JOIN amali orqasida ON bandi qaysi kalitlar bo'yicha moslik tekshirilishini belgilaydi.",
        expertHint: "ON kalit so'zi."
    },
    {
        id: "img_db_6",
        level: 6,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        image: "assets/diagrams/sql_joins_diagram.svg",
        question: "Suratdagi Venn diagrammasida faqat ikkala jadvalda ham mavjud mos keluvchi yozuvlarni oluvchi SQL amali qaysi?",
        options: ["INNER JOIN","FULL OUTER JOIN","CROSS JOIN","LEFT JOIN"],
        correct: 0,
        explanation: "INNER JOIN ikkala jadvalning kesishmasidagi umumiy mos kalitlarga ega qatorlarni tanlab beradi.",
        expertHint: "Suratda yashil rangda ikkala doiraning o'rtasi (kesishmasi) bo'yalgan — bu INNER JOIN."
    },
    {
        id: "db_7_1",
        level: 7,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Ikki jadvalni faqat mos kelgan umumiy satrlarini birlashtiruvchi JOIN turi qaysi?",
        options: ["LEFT JOIN","INNER JOIN","RIGHT JOIN","FULL OUTER JOIN"],
        correct: 1,
        explanation: "INNER JOIN har ikkala jadvalda shartga to'liq mos kelgan kesishma satrlarnigina qaytaradi.",
        expertHint: "Faqat umumiy mos kelgan satrlar - INNER JOIN."
    },
    {
        id: "db_7_2",
        level: 7,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Tranzaksiya davomida biror xatolik yuz berganda, barcha o'zgarishlarni bekor qilib bazani avvalgi holatiga qaytarish buyrug'i qaysi?",
        options: ["ROLLBACK","CANCEL","REVERT","UNDO ALL"],
        correct: 0,
        explanation: "ROLLBACK tranzaksiya doirasida bajarilgan barcha SQL amallarini bekor qilib, ma'lumotlar bazasini dastlabki barqaror holatga qaytaradi.",
        expertHint: "ROLLBACK buyrug'i."
    },
    {
        id: "db_7_3",
        level: 7,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Tranzaksiyadagi barcha amallar muvaffaqiyatli bajarilgach, o'zgarishlarni diskka muhrlab mustahkamlash uchun qaysi buyruq beriladi?",
        options: ["COMMIT","SAVE NOW","SUBMIT","FINALIZE"],
        correct: 0,
        explanation: "COMMIT buyrug'i tranzaksiyani yakunlaydi va barcha kiritilgan o'zgarishlarni bazada qaytarib olinmas qilib qat'iy saqlab qo'yadi.",
        expertHint: "COMMIT buyrug'i."
    },
    {
        id: "db_7_4",
        level: 7,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "ACID tamoyillaridagi 'C' harfi qaysi xossani ifodalaydi?",
        options: ["Consistency (Muvofiqlik / Izchillik) — tranzaksiya barcha cheklovlar va qoidalarga rioya qilishi","Capacity (Sig'im)","Compatibility (Moslik)","Connection (Ulanish)"],
        correct: 0,
        explanation: "Consistency ma'lumotlar bazasi tranzaksiyadan oldin ham, keyin ham barcha yaxlitlik cheklovlariga (foreign key, unique va h.k.) qat'iy muvofiq qolishini kafolatlaydi.",
        expertHint: "Consistency (Muvofiqlik / Izchillik)."
    },
    {
        id: "db_7_5",
        level: 7,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "ACID tamoyillaridagi 'I' harfi (Isolation) nimani ta'minlaydi?",
        options: ["Parallel bajarilayotgan bir nechta tranzaksiyalarning bir-biriga nojo'ya ta'sir o'tkazmasligini","Internetga ulanishni","Indekslarni yaratishni","Foydalanuvchilarni autentifikatsiya qilishni"],
        correct: 0,
        explanation: "Isolation xossasi bir vaqtda ishlayotgan tranzaksiyalar go'yoki ketma-ket bajarilayotgandek xavfsiz va alohida ishlashini ta'minlaydi.",
        expertHint: "Isolation (Izolyatsiya) — tranzaksiyalar bir-biriga xalal bermaydi."
    },
    {
        id: "db_7_6",
        level: 7,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "ACID tamoyillaridagi 'D' harfi (Durability) nimani kafolatlaydi?",
        options: ["Tranzaksiya muvaffaqiyatli COMMIT bo'lgach, hatto server elektr ta'minoti uzilsa ham ma'lumotlar yo'qolmasligini","Jadval o'lchamini","Tarmoq tezligini","Dasturlash tilini"],
        correct: 0,
        explanation: "Durability (Chidamlilik) tasdiqlangan tranzaksiya natijalari diskka xavfsiz (WAL jurnali orqali) muhrlanib, har qanday tizim avariyasida ham saqlanib qolishini kafolatlaydi.",
        expertHint: "Durability (Chidamlilik / Saqlanuvchanlik)."
    },
    {
        id: "db_8_1",
        level: 8,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Tranzaksiyalarning ACID xossalarida 'A' harfi nimani anglatadi?",
        options: ["Atomicity (Atomarlik)","Accuracy","Availability","Authorization"],
        correct: 0,
        explanation: "Atomicity: tranzaksiyadagi barcha amallar to'liq bajarilishi shart, biror xato bo'lsa barchasi bekor qilinadi.",
        expertHint: "ACID ning birinchi harfi - Atomicity (Atomarlik)."
    },
    {
        id: "db_8_2",
        level: 8,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Relyatsion ma'lumotlar bazasida 2-normal forma (2NF) talabi nimadan iborat?",
        options: ["Jadval 1NF da bo'lishi va barcha no-kalit atributlar murakkab birlamchi kalitga to'liq funksional bog'liq bo'lishi (qisman bog'liqlik bo'lmasligi)","Jadvalda 2 tadan ko'p ustun bo'lmasligi","Jadval faqat raqamli ma'lumotlarni saqlashi","Jadvalda kamida 2 ta tashqi kalit bo'lishi"],
        correct: 0,
        explanation: "2NF jadvalning barcha nokalit ustunlari kompozit birlamchi kalitning bir qismiga emas, to'liq kalitga bog'liq bo'lishini talab qiladi.",
        expertHint: "1NF talablari + murakkab kalitga to'liq funksional bog'liqlik."
    },
    {
        id: "db_8_3",
        level: 8,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "3-normal forma (3NF) ma'lumotlar modelidan nimani butunlay yo'qotishni maqsad qiladi?",
        options: ["Tranzitiv bog'liqlikni (nokalit atribut boshqa bir nokalit atribut orqali kalitga bog'lanib qolishini)","Birlamchi kalitni","Barcha matnli maydonlarni","Jadvallararo bog'lanishlarni"],
        correct: 0,
        explanation: "3NF: jadval 2NF da bo'lishi va hech bir nokalit atribut boshqa bir nokalit atributga bog'liq bo'lmasligi (tranzitiv bog'liqlik yo'q qilinishi) kerak.",
        expertHint: "Tranzitiv funksional bog'liqlikni yo'qotish."
    },
    {
        id: "db_9_1",
        level: 9,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Ma'lumotlar bazasida qidiruv tezligini keskin oshirish uchun ustunlarga nima qo'yiladi?",
        options: ["Trigger","Indeks (Index)","Tranzaksiya","View"],
        correct: 1,
        explanation: "Indekslar (B-Tree va h.k.) jadvalni to'liq skan qilmasdan kerakli yozuvlarni tez topish imkonini beradi.",
        expertHint: "Qidiruvni tezlashtirish vositasi - Index (indeks)."
    },
    {
        id: "db_9_2",
        level: 9,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Relyatsion MBBT larda (PostgreSQL, MySQL, Oracle) indekslar uchun standart va eng ko'p qo'llaniladigan daraxt strukturasi qaysi?",
        options: ["B-Tree (B+ Tree)","Qizil-qora daraxt","Oddiy binar qidiruv daraxti (BST)","Splay Tree"],
        correct: 0,
        explanation: "B-Tree va B+ Tree disklarda blokli o'qish uchun optimallashtirilgan muvozanatlashgan ko'p shoxli daraxt bo'lib, O(log N) qidiruv beradi.",
        expertHint: "B-Tree yoki B+ Tree."
    },
    {
        id: "db_9_3",
        level: 9,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Jadval ustunlariga haddan tashqari ko'p indekslar yaratishning qanday asosiy salbiy oqibatlari bor?",
        options: ["INSERT, UPDATE va DELETE amallarining sezilarli sekinlashishi hamda qo'shimcha disk xotirasi sarfi","SELECT so'rovlarining butunlay ishlamay qolishi","Tarmoq kabelining qizib ketishi","Foydalanuvchi parollarining o'chib ketishi"],
        correct: 0,
        explanation: "Har bir yangi yozuv qo'shilganda yoki o'zgartirilganda barcha tegishli indeks daraxtlari ham qayta quriladi, bu esa yozish tezligini tushiradi.",
        expertHint: "Yozish (INSERT, UPDATE) operatsiyalari sekinlashadi va disk sarflanadi."
    },
    {
        id: "db_10_1",
        level: 10,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Jadvalda ortiqcha takrorlanishlarni (redundancy) yo'qotish va mantiqiy tuzish jarayoni nima?",
        options: ["Normalizatsiya (1NF, 2NF, 3NF)","Denormalizatsiya","Shifrlash","Kompilyatsiya"],
        correct: 0,
        explanation: "Normalizatsiya bazani mantiqiy tozalash va ortiqcha takroriyliklardan xalos qilish usulidir.",
        expertHint: "Takroriylikni yo'qotish - Normalizatsiya."
    },
    {
        id: "db_10_2",
        level: 10,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Ma'lumotlar bazasida 'Trigger' (Triger) nima?",
        options: ["Jadvalda INSERT, UPDATE yoki DELETE hodisasi yuz berganda avtomatik ravishda ishga tushuvchi maxsus protsedura","Faqat server yuklanganda ishlaydigan skript","Foydalanuvchi login paroli tekshirgichi","Zaxira nusxa oluvchi dastur"],
        correct: 0,
        explanation: "Triggerlar ma'lumotlar yaxlitligini nazorat qilish va audit jurnallarini avtomatik yuritish uchun berilgan hodisada avtomatik bajariladi.",
        expertHint: "INSERT, UPDATE yoki DELETE da avtomatik ishga tushadigan protsedura."
    },
    {
        id: "db_10_3",
        level: 10,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Saqlanadigan protseduralarning (Stored Procedures) oddiy mijoz so'rovlariga nisbatan afzalligi nimada?",
        options: ["Ular serverda oldindan kompilyatsiya qilinadi, tarmoq trafigini keskin kamaytiradi va bajarilish tezligini oshiradi","Ular hech qachon diskka yozilmaydi","Ular faqat 1 bayt joy egallaydi","Ularni yozish uchun maxsus ruxsatnoma kerak emas"],
        correct: 0,
        explanation: "Protsedura server xotirasida tayyor saqlanadi, mijoz faqat nomini chaqiradi, bu tarmoq xarajatlarini kamaytiradi va xavfsizlikni kuchaytiradi.",
        expertHint: "Serverda oldindan tayyorlanadi va tarmoq trafigini tejaydi."
    },
    {
        id: "db_11_1",
        level: 11,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Jadvalda hodisa (INSERT, UPDATE, DELETE) sodir bo'lganda avtomatik ishga tushadigan dastur kodi nima?",
        options: ["Protsedura","Trigger","Funksiya","View"],
        correct: 1,
        explanation: "Trigger ma'lumotlar o'zgarganda avtomatik ravishda otilib ishga tushadi.",
        expertHint: "Avtomatik javob beruvchi mexanizm - bu Trigger."
    },
    {
        id: "db_11_2",
        level: 11,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Mashhur MongoDB ma'lumotlar bazasi NoSQL ning qaysi oilasiga mansub va ma'lumotlarni qanday formatda saqlaydi?",
        options: ["Hujjatli (Document-oriented) — BSON (Binary JSON) formatida","Kalit-qiymat (Key-Value) — matnli fayllarda","Grafli (Graph) — cho'qqi va qirralarda","Relyatsion — qat'iy jadvallarda"],
        correct: 0,
        explanation: "MongoDB hujjatli NoSQL bazasi bo'lib, ierarxik, sxemasiz moslashuvchan JSON/BSON formatidagi hujjatlarni saqlaydi.",
        expertHint: "Hujjatli (Document) va BSON formati."
    },
    {
        id: "db_11_3",
        level: 11,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Yuqori tezlikdagi kesh va sessiyalar uchun ishlatiladigan Redis tizimi ma'lumotlarni qayerda saqlaydi?",
        options: ["Tezkor xotirada (RAM / In-Memory)","Optik disklarda (CD/DVD)","Faqat tashqi flesh-kartada","Brauzerning cookies fayllarida"],
        correct: 0,
        explanation: "Redis In-Memory kalit-qiymat ma'lumotlar tuzilmasi bo'lib, barcha ma'lumotlarni operativ xotirada saqlagani uchun mikrosekundlarda javob beradi.",
        expertHint: "Operativ xotirada (RAM / In-Memory)."
    },
    {
        id: "db_12_1",
        level: 12,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Relyatsion bo'lmagan, moslashuvchan JSON (BSON) hujjatlar bilan ishlovchi mashhur NoSQL MBT qaysi?",
        options: ["PostgreSQL","Oracle","MongoDB","MySQL"],
        correct: 2,
        explanation: "MongoDB hujjatli NoSQL bazalar orasida eng mashhuridir.",
        expertHint: "JSON formatida ishlovchi NoSQL baza - MongoDB."
    },
    {
        id: "db_12_2",
        level: 12,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "NoSQL taqsimlangan tizimlarda ACID o'rniga qo'llaniladigan BASE modeli nimani ifodalaydi?",
        options: ["Basically Available, Soft state, Eventual consistency (Asosan mavjud, moslashuvchan holat, oxir-oqibat muvofiqlik)","Binary Access System Engine","Base Algorithm for Secure Encryption","Block Allocation Storage Extension"],
        correct: 0,
        explanation: "BASE modeli yuqori mavjudlikni (Availability) qat'iy bir lahzalik muvofiqlikdan ustun qo'yadi va vaqt o'tib ma'lumotlar sinxronlashishini ta'minlaydi.",
        expertHint: "Basically Available, Soft state, Eventual consistency."
    },
    {
        id: "db_12_3",
        level: 12,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Bir nechta alohida serverlarda taqsimlangan tranzaksiyalarning atomarligini kafolatlovchi klassik protokol qaysi?",
        options: ["Two-Phase Commit (2PC — Ikki bosqichli tasdiqlash protokoli: Prepare va Commit)","Three-Way Handshake","Master-Slave Replication","Paxos Token Passing"],
        correct: 0,
        explanation: "2PC protokoli barcha qatnashuvchi tugunlar avval tayyorgarlik ko'rishini (Prepare), barchasi rozi bo'lgandagina yakuniy saqlashni (Commit) boshqaradi.",
        expertHint: "Two-Phase Commit (2PC)."
    },
    {
        id: "db_13_1",
        level: 13,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Bitta ulkan jadvalni bir nechta fizik serverlar bo'ylab gorizontal bo'laklash nima deyiladi?",
        options: ["Sharding (Sharding)","Replikatsiya","Bekap","Kesh"],
        correct: 0,
        explanation: "Sharding katta bazani gorizontal bo'laklarga ajratib serverlarga taqsimlashdir.",
        expertHint: "Gorizontal bo'laklab serverlarga taqsimlash - Sharding."
    },
    {
        id: "db_13_2",
        level: 13,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Ma'lumotlar bazalarida 'Dirty Read' (Iflos o'qish) hodisasi qachon sodir bo'ladi?",
        options: ["Bitta tranzaksiya boshqa bir parallel tranzaksiya tomonidan kiritilgan, lekin hali COMMIT qilinmagan (bekor qilinishi mumkin bo'lgan) ma'lumotni o'qib olganda","Jadvaldagi barcha ma'lumotlar tasodifan o'chirilganda","Server xotirasiga chang tushganda","Foydalanuvchi noto'g'ri parol kiritganda"],
        correct: 0,
        explanation: "Dirty read tranzaksiya hali tasdiqlanmagan xom o'zgarishni o'qib, keyinchalik u tranzaksiya rollback bo'lib ketsa, soxta ma'lumot bilan ishlash anomaliyasidir.",
        expertHint: "Hali commit bo'lmagan ma'lumotni boshqa tranzaksiya o'qib olishi."
    },
    {
        id: "db_13_3",
        level: 13,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Tranzaksiyalarning 'Repeatable Read' izolyatsiya darajasida qaysi noxush anomaliya yuz berishi mumkin?",
        options: ["Phantom Read (Xayoliy qatorlar paydo bo'lishi)","Dirty Read","Lost Update","Barcha jadvallarning qulflanib qolishi"],
        correct: 0,
        explanation: "Repeatable Read mavjud qatorlarning o'zgarishini bloklaydi, biroq boshqa tranzaksiya yangi qator INSERT qilsa, oraliq qidiruvda yangi 'xayoliy' satr paydo bo'lishi mumkin.",
        expertHint: "Phantom Read (Xayoliy qatorlar)."
    },
    {
        id: "db_14_1",
        level: 14,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "CAP teoremasiga ko'ra taqsimlangan tizimlarda qaysi uchtalikdan faqat ikkitasini kafolatlash mumkin?",
        options: ["Muvofiqlik (C), Mavjudlik (A), Bo'linishga bardoshlilik (P)","Tezlik, Xavfsizlik, Narx","Hajm, Narx, Ishonchlilik","Server, Klient, Tarmoq"],
        correct: 0,
        explanation: "CAP: Consistency (C), Availability (A), Partition tolerance (P).",
        expertHint: "CAP teoremasi: Consistency, Availability, Partition tolerance."
    },
    {
        id: "db_14_2",
        level: 14,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "So'rov rejasida (EXPLAIN) 'Seq Scan' (Sequential Scan) nima ekanligini bildiradi?",
        options: ["MBBT jadvalning barcha sahifalari va qatorlarini boshidan oxirigacha to'liq ketma-ket o'qib chiqishini","Faqat indeks bo'yicha tezkor qidiruvni","So'rovda sintaktik xatolik borligini","Natijaning keshdan olinganligini"],
        correct: 0,
        explanation: "Seq Scan (Full Table Scan) indeks yo'qligi yoki jadval juda kichikligi sababli jadvalning barcha yozuvlari diskdan birma-bir tekshirib chiqilishidir.",
        expertHint: "Jadvalni boshidan oxirigacha to'liq o'qib chiqish."
    },
    {
        id: "db_14_3",
        level: 14,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Katta yuklamali ma'lumotlar bazalarida Sharding (Shardlash) nima?",
        options: ["Ma'lumotlar bazasidagi katta jadvallarni bir nechta mustaqil jismoniy serverlarga gorizontal qismlarga bo'lib taqsimlash","Faqat zaxira nusxa yaratish jarayoni","Jadvaldagi ustunlarni o'chirish usuli","Foydalanuvchilarni autentifikatsiya qilish usuli"],
        correct: 0,
        explanation: "Sharding gorizontal masshtablash usuli bo'lib, masalan mijozlarni ID si bo'yicha alohida-alohida server klasterlariga taqsimlab yuklamani kamaytiradi.",
        expertHint: "Gorizontal ravishda bir nechta serverlarga bo'lib taqsimlash."
    },
    {
        id: "db_15_1",
        level: 15,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Tranzaksiyalarning eng yuqori, fantom o'qishlarni butunlay yo'qotuvchi izolyatsiya darajasi qaysi?",
        options: ["Repeatable Read","Read Committed","Serializable","Read Uncommitted"],
        correct: 2,
        explanation: "Serializable eng qat'iy va xavfsiz izolyatsiya darajasidir.",
        expertHint: "Eng yuqori izolyatsiya darajasi - Serializable."
    },
    {
        id: "db_15_2",
        level: 15,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "Ma'lumotlar ombori (Data Warehouse) va OLAP tizimlaridagi 'Yulduzsimon sxema' (Star Schema) qanday tuziladi?",
        options: ["Markazda bitta katta Faktlar jadvali (Fact table) va uning atrofida bir nechta O'lchamlar jadvallari (Dimension tables)","Barcha jadvallar faqat bitta zanjir shaklida ulanadi","Faqat bitta jadvaldan iborat bo'ladi","Jadvallar o'rtasida aloqa bo'lmaydi"],
        correct: 0,
        explanation: "Yulduzsimon sxemada markaziy Fakt jadvali o'lchanadigan ko'rsatkichlarni (masalan sotuvlar summasi) saqlaydi, nurlar kabi unga ulangan Dimension jadvallari esa vaqt, mijoz, do'kon tahlilini beradi.",
        expertHint: "Markazda Fact jadval va atrofida Dimension jadvallari."
    },
    {
        id: "db_15_3",
        level: 15,
        category: "database",
        categoryName: "Ma'lumotlar bazasi",
        question: "PostgreSQL va Oracle kabi zamonaviy MBBT lardagi MVCC (Multi-Version Concurrency Control) mexanizmining bosh afzalligi nima?",
        options: ["O'qish operatsiyalari yozishni bloklamaydi, yozish esa o'qishni bloklamaydi (o'quvchilar ma'lumotning o'sha lahzadagi versiyasini ko'radi)","Tranzaksiyalar umuman xotira ishlatmaydi","Parollar har bir so'rovda yangilanadi","Baza hajmi 2 barobarga qisqaradi"],
        correct: 0,
        explanation: "MVCC o'zgartirilayotgan qatorlarning bir vaqtda bir nechta versiyasini saqlaydi, natijada o'qish va yozish jarayonlari bir-biriga xalal bermaydi.",
        expertHint: "O'qish yozishni, yozish esa o'qishni bloklamaydi."
    },
    {
        id: "el_1_1",
        level: 1,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Zanjir qismi uchun Om qonuni qaysi formula bilan ifodalanadi?",
        options: ["U = I / R","I = U / R","R = U * I","P = U / I"],
        correct: 1,
        explanation: "Om qonuni: I = U / R. Tok kuchi kuchlanishga to'g'ri, qarshilikka teskari proporsional.",
        expertHint: "Elektronikaning 1-qonuni: I = U / R."
    },
    {
        id: "el_1_2",
        level: 1,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Xalqaro birliklar sistemasida (SI) elektr toki kuchining o'lchov birligi nima?",
        options: ["Amper (A)","Volt (V)","Vatt (W)","Joul (J)"],
        correct: 0,
        explanation: "Elektr toki kuchi Amperlarda (A), kuchlanish Voltlarda (V), quvvat esa Vattlarda (W) o'lchanadi.",
        expertHint: "Tok kuchi Amper (A) da o'lchanadi."
    },
    {
        id: "el_1_3",
        level: 1,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Elektr zanjiridagi qarshilikning (rezistivlikning) xalqaro o'lchov birligi nima?",
        options: ["Om (Ohm / Omega)","Farad (F)","Genri (H)","Tezla (T)"],
        correct: 0,
        explanation: "Elektr qarshiligi nemis fizigi Georg Om sharafiga Om (Ohm) deb ataladi va Omega belgisi bilan ifodalanadi.",
        expertHint: "Om (Ohm)."
    },
    {
        id: "el_1_4",
        level: 1,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Elektr potensiallar farqi (elektr kuchlanishi) qaysi birlikda o'lchanadi?",
        options: ["Volt (V)","Amper (A)","Om (Omega)","Genri (H)"],
        correct: 0,
        explanation: "Elektr kuchlanishi italiyalik fizik Alessandro Volta sharafiga Volt (V) birligida o'lchanadi.",
        expertHint: "Kuchlanish Volt (V) larda o'lchanadi."
    },
    {
        id: "el_1_5",
        level: 1,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Elektr quvvatining o'lchov birligi nima va u qaysi formula bilan hisoblanadi?",
        options: ["Vatt (W), formula: P = U * I","Joul (J), formula: A = F * S","Farad (F), formula: C = q / U","Nyuton (N)"],
        correct: 0,
        explanation: "Elektr quvvati Vattlarda (W) o'lchanadi va kuchlanish hamda tok kuchi ko'paytmasiga teng: P = U * I.",
        expertHint: "Vatt (W) va P = U * I."
    },
    {
        id: "el_1_6",
        level: 1,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Vaqt o'tishi bilan yo'nalishi va qiymati o'zgarmaydigan elektr toki nima deyiladi?",
        options: ["O'zgarmas tok (DC - Direct Current)","O'zgaruvchan tok (AC)","Garmonik tok","Impulsli tok"],
        correct: 0,
        explanation: "Akkumulyatorlar va batareyalar beradigan doimiy bir tomonlama tok o'zgarmas tok (DC) deb ataladi.",
        expertHint: "O'zgarmas tok (DC)."
    },
    {
        id: "el_1_7",
        level: 1,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Vaqt o'tishi bilan qiymati va yo'nalishi davriy ravishda o'zgarib turuvchi elektr toki nima deb ataladi?",
        options: ["O'zgaruvchan tok (AC - Alternating Current)","O'zgarmas tok (DC)","Statik zaryad","Kvant toki"],
        correct: 0,
        explanation: "Oddiy xonadon rozetkalaridagi 220V va 50Hz lik tok o'zgaruvchan tok (AC) deb nomlanadi.",
        expertHint: "O'zgaruvchan tok (AC)."
    },
    {
        id: "el_1_8",
        level: 1,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "O'tkazgichning elektr qarshiligi uning uzunligiga (L) va ko'ndalang kesim yuzasiga (S) qanday bog'liq?",
        options: ["Uzunligiga to'g'ri, kesim yuzasiga teskari proporsional: R = rho * L / S","Uzunligiga teskari, kesimiga to'g'ri","Faqat haroratga bog'liq","Uzunligi va kesimiga bog'liq emas"],
        correct: 0,
        explanation: "Sim qancha uzun bo'lsa qarshiligi shuncha ortadi, qalin (kesimi katta) bo'lsa qarshiligi kamayadi: R = rho * L / S.",
        expertHint: "Uzunligiga to'g'ri, qalinligiga (kesimiga) teskari: R = rho * L / S."
    },
    {
        id: "el_2_1",
        level: 2,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Elektr tokini faqat bir tomonga o'tkazuvchi yarimo'tkazgich asbob nima deyiladi?",
        options: ["Rezistor","Diod","Kondensator","G'altak"],
        correct: 1,
        explanation: "Diod p-n o'tish hisobiga tokni faqat bitta yo'nalishda o'tkazadi.",
        expertHint: "Bir tomonlama o'tkazuvchi element - Diod."
    },
    {
        id: "el_2_2",
        level: 2,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        image: "assets/diagrams/resistors_parallel.svg",
        question: "Har birining qarshiligi 10 Om bo'lgan ikkita bir xil rezistor o'zaro parallel ulanganda umumiy qarshilik necha Om bo'ladi?",
        options: ["5 Om","20 Om","10 Om","1 Om"],
        correct: 0,
        explanation: "Ikkita teng qarshilik parallel ulanganda umumiy qarshilik ularning yarmiga teng bo'ladi: R_umum = 10 / 2 = 5 Om.",
        expertHint: "Parallel ulanganda qarshilik kamayadi: 10 / 2 = 5 Om."
    },
    {
        id: "el_2_3",
        level: 2,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Ketma-ket ulangan elektr zanjirida barcha elementlardan o'tuvchi qaysi kattalik o'zaro teng (bir xil) bo'ladi?",
        options: ["Elektr toki kuchi (I)","Kuchlanish tushishi (U)","Ajralib chiqadigan quvvat","Magnit maydon kuchlanishi"],
        correct: 0,
        explanation: "Ketma-ket zanjirda tokning tarmoqlanishi uchun boshqa yo'l yo'q, shuning uchun zanjirning har bir nuqtasida tok kuchi bir xil bo'ladi.",
        expertHint: "Ketma-ket zanjirda tok kuchi bir xil bo'ladi."
    },
    {
        id: "el_2_4",
        level: 2,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Kirxgofning 2-qonuni (konturlar qoidasi) nimani ifodalaydi?",
        options: ["Ixtiyoriy yopiq konturdagi EYUK larning algebraik yig'indisi shu konturdagi kuchlanish tushishlari yig'indisiga teng: Sum(E) = Sum(I * R)","Barcha toklar ko'paytmasi nolga teng","Zanjirdagi umumiy qarshilik nol bo'lishi","Kuchlanish har doim o'zgarmas qolishi"],
        correct: 0,
        explanation: "Kirxgofning 2-qonuniga binoan har qanday yopiq elektr zanjirida manbalar kuchlanishi qarshiliklardagi kuchlanish tushishlariga teng bo'ladi.",
        expertHint: "Yopiq konturda EYUK lar yig'indisi kuchlanish tushishlari yig'indisiga teng."
    },
    {
        id: "el_2_5",
        level: 2,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Har birining qarshiligi 10 Om bo'lgan ikkita rezistor KETMA-KET ulanganda umumiy qarshilik necha Om bo'ladi?",
        options: ["20 Om","5 Om","10 Om","1 Om"],
        correct: 0,
        explanation: "Ketma-ket ulanganda qarshiliklar to'g'ridan-to'g'ri qo'shiladi: R_umum = R1 + R2 = 10 + 10 = 20 Om.",
        expertHint: "Ketma-ket ulanganda qo'shiladi: 10 + 10 = 20 Om."
    },
    {
        id: "el_2_6",
        level: 2,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Parallel ulangan elektr zanjirida qaysi kattalik barcha parallel tarmoqlarda bir xil (teng) bo'ladi?",
        options: ["Kuchlanish (U)","Tok kuchi (I)","Qarshilik","Ajralgan quvvat"],
        correct: 0,
        explanation: "Parallel ulangan barcha elementlarning uchlari bir xil ikkita umumiy nuqtaga (tugunga) tutashgani uchun ulardagi kuchlanish bir xil bo'ladi.",
        expertHint: "Parallel ulanganda kuchlanish bir xil bo'ladi."
    },
    {
        id: "el_2_7",
        level: 2,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Elektr zanjirida 'Qisqa tutashuv' (Short Circuit) yuz berganda nima sodir bo'ladi?",
        options: ["Zanjir qarshiligi deyarli nolga tushib, tok kuchi xavfli darajada keskin ortib ketadi","Tok butunlay to'xtaydi","Kuchlanish cheksiz katta bo'ladi","Faqat chastota ortadi"],
        correct: 0,
        explanation: "Faza va nol yoki manba qutblari to'g'ridan-to'g'ri tutashganda qarshilik R -> 0 bo'lib, Om qonuniga binoan I = U/R o'ta keskin ortadi va qizish, yong'inga olib kelishi mumkin.",
        expertHint: "Qarshilik nolga yaqinlashib, tok kuchi keskin ortib ketadi."
    },
    {
        id: "el_2_8",
        level: 2,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Zanjirni haddan tashqari yuqori tokdan va qisqa tutashuvdan himoya qiluvchi eng oddiy asbob nima?",
        options: ["Eruvchan saqlagich (Predoxranitel / Fuse)","Rezistor","Diod","Transformator"],
        correct: 0,
        explanation: "Saqlagich belgilangan tok me'yoridan oshganda ichidagi yupqa sim erib, zanjirni uzadi va qurilmani shikastlanishdan asraydi.",
        expertHint: "Saqlagich (predoxranitel / fuse)."
    },
    {
        id: "el_3_1",
        level: 3,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Elektr zaryadini va energiyasini jamg'arish (saqlash) xususiyatiga ega element qaysi?",
        options: ["Kondensator (Capacitor)","Rezistor","Diod","Kalit"],
        correct: 0,
        explanation: "Kondensator o'tkazgich plastinalar orasidagi elektr maydoni yordamida zaryad to'playdi.",
        expertHint: "Zaryad to'plovchi element - kondensator."
    },
    {
        id: "el_3_2",
        level: 3,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Elektr sig'imining (kondensator sig'imining) xalqaro o'lchov birligi nima?",
        options: ["Farad (F)","Genri (H)","Veber (Wb)","Nyuton (N)"],
        correct: 0,
        explanation: "Elektr sig'imi Faradlarda o'lchanadi (amaliyotda ko'pincha mikrofarad uF yoki pikofarad pF ishlatiladi).",
        expertHint: "Farad (F)."
    },
    {
        id: "el_3_3",
        level: 3,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Induktiv g'altakdan elektr toki o'tganda u o'zida qanday turdagi energiyani to'playdi?",
        options: ["Magnit maydon energiyasini: W = (L * I^2) / 2","Elektrostatik maydon energiyasini","Kinetik energiyani","Yadro energiyasini"],
        correct: 0,
        explanation: "G'altak o'zidan o'tayotgan tok hisobiga magnit maydon energiyasini to'playdi (kondensator esa elektr maydon energiyasini to'playdi).",
        expertHint: "Magnit maydoni energiyasi."
    },
    {
        id: "el_3_4",
        level: 3,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Ikkita kondensator PARALLEL ulanganda ularning umumiy sig'imi qanday hisoblanadi?",
        options: ["Sig'imlar to'g'ridan-to'g'ri qo'shiladi: C_umum = C1 + C2","C_umum = (C1 * C2) / (C1 + C2)","C_umum = C1 / C2","Sig'imlar kamayadi"],
        correct: 0,
        explanation: "Kondensatorlar parallel ulanganda plastinalar yuzasi kengaygandek bo'ladi, shuning uchun umumiy sig'im qo'shiladi: C_umum = C1 + C2.",
        expertHint: "Parallel ulanganda sig'imlar qo'shiladi: C1 + C2."
    },
    {
        id: "el_3_5",
        level: 3,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "G'altakning induktivlik ko'rsatkichi xalqaro birliklar sistemasida qanday birlikda o'lchanadi?",
        options: ["Genri (H)","Farad (F)","Om (Omega)","Veber (Wb)"],
        correct: 0,
        explanation: "Induktivlik amerikalik olim Jozef Genri sharafiga Genri (H) deb ataladi.",
        expertHint: "Genri (H) da o'lchanadi."
    },
    {
        id: "el_3_6",
        level: 3,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Kondensator o'zgarmas tok (DC) uchun qanday qarshilik ko'rsatadi?",
        options: ["Cheksiz katta qarshilik (zanjirni o'zgarmas tok uchun uzib qo'yadi)","Nol qarshilik","10 Om","Faqat 1 Amper tok o'tkazadi"],
        correct: 0,
        explanation: "Kondensator o'zgarmas tok zaryadlangach uni butunlay o'tkazmaydi (X_c = 1 / (2*pi*f*C), f=0 bo'lganda X_c -> cheksiz).",
        expertHint: "O'zgarmas tokni o'tkazmaydi (cheksiz qarshilik)."
    },
    {
        id: "el_3_7",
        level: 3,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Yuqori chastotali o'zgaruvchan tok tebranishlarini to'sib, o'zgarmas tokni yaxshi o'tkazuvchi induktiv g'altak nima deyiladi?",
        options: ["Drossel","Reostat","Potensiometr","Stabilitron"],
        correct: 0,
        explanation: "Drossel induktivlikka ega g'altak bo'lib, filtrlarda o'zgaruvchan shovqinlarni to'sish uchun ishlatiladi.",
        expertHint: "Drossel."
    },
    {
        id: "el_4_1",
        level: 4,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        image: "assets/diagrams/diode_circuit.svg",
        question: "Signallarni kuchaytirish va mantiqiy elektron kalit sifatida ishlatiladigan uch elektrodli asbob nima?",
        options: ["Transformator","Rezistor","Tranzistor","Saqlagich"],
        correct: 2,
        explanation: "Tranzistor zamonaviy barcha kompyuter chiplarining asosiy kalit va kuchaytirgich elementidir.",
        expertHint: "Kuchaytiruvchi va kalit vazifasini bajaruvchi element - Tranzistor."
    },
    {
        id: "el_4_2",
        level: 4,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Yorug'lik chiqaruvchi diodning (Svetodiod / LED) asosiy ishlash prinsipi nimadan iborat?",
        options: ["p-n o'tishdan to'g'ri tok o'tganda elektron va kovaklarning rekombinatsiyasi natijasida nurni to'g'ridan-to'g'ri chiqarish","Simni cho'g'lanish darajasiga qadar qizdirish","Lazer gazini ionlashtirish","Faqat magnit maydonni aks ettirish"],
        correct: 0,
        explanation: "LED yarimo'tkazgich kristallda to'g'ri yo'nalishdagi tok ta'sirida fotonlar ajralib chiqishi (elektrolyuminessensiya) hodisasiga asoslangan.",
        expertHint: "Elektron va kovaklarning rekombinatsiyasi natijasida foton ajralishi."
    },
    {
        id: "el_4_3",
        level: 4,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Stabilitron (Zener diodi) radioelektronika sxemalarida asosan nima uchun xizmat qiladi?",
        options: ["Teskari teshilish rejimida ishlab, zanjirdagi kuchlanishni qat'iy barqarorlashtirish (stabilizatsiya) uchun","Signallarni chastota bo'yicha kuchaytirish uchun","O'zgarmas tokni o'zgaruvchan tokka aylantirish uchun","Sxemani elektrdan butunlay uzish uchun"],
        correct: 0,
        explanation: "Zener diodi teskari ulanganda ma'lum bir teshilish kuchlanishida kuchlanishni o'zgarmas saqlab turadi va kuchlanish stabilizatorlarida tayanch manba bo'lib xizmat qiladi.",
        expertHint: "Kuchlanishni barqarorlashtirish (stabilizatsiya)."
    },
    {
        id: "el_4_4",
        level: 4,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Diodning p-sohasi bilan n-sohasi tutashgan chegara hududi nima deb ataladi?",
        options: ["p-n o'tish (elektron-kovak o'tishi)","Kanal","Dielektrik","Kollektor"],
        correct: 0,
        explanation: "Yarimo'tkazgich kristallda kovakli (p) va elektronli (n) sohalar tutashgan joy p-n o'tish deb nomlanadi va bir tomonlama o'tkazuvchanlikni ta'minlaydi.",
        expertHint: "p-n o'tish."
    },
    {
        id: "el_4_5",
        level: 4,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Kremniyli (silitsiy) standart diod to'g'ri yo'nalishda ochilishi uchun unga taxminan qancha kuchlanish berilishi kerak?",
        options: ["0.6 – 0.7 Volt","5 Volt","12 Volt","0.01 Volt"],
        correct: 0,
        explanation: "Kremniy diodlarning potensial to'sig'i taxminan 0.6 - 0.7 V bo'lib, kuchlanish shu darajaga yetgach diod to'liq ochiladi (germaniyda esa 0.2 - 0.3 V).",
        expertHint: "0.6 – 0.7 Volt atrofida."
    },
    {
        id: "el_4_6",
        level: 4,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "O'zgaruvchan tokni to'liq ikki yarim davrli qilib to'g'rilash uchun qaysi sxema ishlatiladi?",
        options: ["Diodli ko'prik (Diode Bridge Rectifier)","Bitta rezistor","Kondensator","Invertor"],
        correct: 0,
        explanation: "4 ta dioddan tuzilgan ko'prikli to'g'rilagich AC tokning ikkala yarim to'lqinini ham bir xil musbat qutbga o'girib beradi.",
        expertHint: "Diodli ko'prik (Diode Bridge)."
    },
    {
        id: "el_4_7",
        level: 4,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Yorug'lik tushganda o'zining teskari qarshiligini o'zgartirib elektr toki hosil qiluvchi yarimo'tkazgich diod qaysi?",
        options: ["Fotodiod","Svetodiod","Stabilitron","Varikap"],
        correct: 0,
        explanation: "Fotodiod optik yorug'lik signallarini elektr signallariga aylantiruvchi sezgir fotodetektor hisoblanadi.",
        expertHint: "Fotodiod."
    },
    {
        id: "el_5_1",
        level: 5,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Mantiqiy 'EMAS' (NOT, invertor) elementi kirishiga 1 signali berilsa, chiqishida nima hosil bo'ladi?",
        options: ["1 (bir)","0 (nol)","Noaniq","Qisqa tutashuv"],
        correct: 1,
        explanation: "NOT elementi kirishdagi qiymatni teskarisiga o'giradi: 1 berilsa 0 chiqadi.",
        expertHint: "Invertor 1 ni 0 ga aylantiradi."
    },
    {
        id: "el_5_2",
        level: 5,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Radioelektronikada Bipolyar tranzistorlarning (BJT) ikkita asosiy vazifasi qaysilar?",
        options: ["Elektr signallarini kuchaytirish va elektron kalit (kommutator) rejimida ishlash","Faqat elektr energiyasini to'plash","Faqat qarshilikni qizdirish","Kabel uzilishini aniqlash"],
        correct: 0,
        explanation: "Tranzistorlar analog sxemalarda kuchaytirgich sifatida, raqamli sxemalarda esa mantiqiy kalit (0 va 1) sifatida ishlatiladi.",
        expertHint: "Signallarni kuchaytirish va kalit rejimida ishlash."
    },
    {
        id: "el_5_3",
        level: 5,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Bipolyar tranzistor qaysi elektr parametri orqali boshqariladi?",
        options: ["Baza elektrodi orqali o'tuvchi tok kuchi (I_b) bilan","Faqat tashqi yorug'lik bilan","Faqat harorat bilan","Kollektordagi qarshilik bilan"],
        correct: 0,
        explanation: "Bipolyar tranzistor tok bilan boshqariladigan asbobdir: kichik baza toki (I_b) katta kollektor tokini (I_c = beta * I_b) boshqaradi.",
        expertHint: "Baza elektrodi orqali o'tuvchi tok (I_b)."
    },
    {
        id: "el_5_4",
        level: 5,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        image: "assets/diagrams/npn_transistor.svg",
        question: "Bipolyar tranzistorlar yarimo'tkazgich qatlamlarining joylashuviga ko'ra qaysi 2 ta asosiy turga bo'linadi?",
        options: ["NPN va PNP","AND va OR","AC va DC","MOSFET va JFET"],
        correct: 0,
        explanation: "Bipolyar tranzistorlar o'rtadagi baza qatlamining turiga qarab NPN va PNP turlariga ajraladi.",
        expertHint: "NPN va PNP turlari."
    },
    {
        id: "el_5_5",
        level: 5,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Bipolyar tranzistorning tok bo'yicha kuchaytirish koeffitsiyenti (beta yoki h21e) nimaga teng?",
        options: ["Kollektor tokining baza tokiga nisbati: beta = I_c / I_b","Baza kuchlanishiga","Kollektor qarshiligiga","Har doim 1 ga"],
        correct: 0,
        explanation: "Kuchaytirish koeffitsiyenti kichik baza toki qancha marta katta kollektor tokini hosil qilishini ko'rsatadi: beta = I_c / I_b.",
        expertHint: "Kollektor toki / Baza toki: I_c / I_b."
    },
    {
        id: "el_5_6",
        level: 5,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Tranzistor to'liq ochilgan (kalit berk) holatda bo'lsa, bu qaysi ishchi rejim deb ataladi?",
        options: ["To'yinish rejimi (Saturation mode)","Uzilish rejimi (Cutoff mode)","Aktiv chiziqli rejim","Kvant rejimi"],
        correct: 0,
        explanation: "To'yinish rejimida tranzistor orqali maksimal tok oqadi va uning ichki qarshiligi minimal bo'ladi, xuddi ulangan mexanik kalit kabi.",
        expertHint: "To'yinish rejimi (Saturation)."
    },
    {
        id: "el_5_7",
        level: 5,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Tranzistordan hech qanday tok o'tmaydigan (kalit ochiq) holat nima deb ataladi?",
        options: ["Uzilish rejimi (Cutoff mode)","To'yinish rejimi","Kutish rejimi","Generatsiya rejimi"],
        correct: 0,
        explanation: "Uzilish rejimida baza toki nol bo'lib, kollektor-emitter zanjiri to'liq uzilgan bo'ladi.",
        expertHint: "Uzilish rejimi (Cutoff)."
    },
    {
        id: "el_6_1",
        level: 6,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Elektr sig'imi qanday birlikda o'lchanadi?",
        options: ["Om (Ω)","Farad (F)","Genri (H)","Volt (V)"],
        correct: 1,
        explanation: "Elektr sig'imi Farad (F) birligida o'lchanadi.",
        expertHint: "Kondensator sig'imi Faradda o'lchanadi."
    },
    {
        id: "el_6_2",
        level: 6,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Maydoniy tranzistorlar (MOSFET) bipolyar tranzistorlardan farqli ravishda qanday boshqariladi?",
        options: ["Zatvor (Gate) ga berilgan kuchlanish hosil qilgan elektr maydon orqali (kirish toki amalda 0 ga teng)","Katta baza toki orqali","Faqat induktiv g'altak orqali","Mexanik bosim orqali"],
        correct: 0,
        explanation: "MOSFET izolyatsiyalangan zatvorga ega bo'lib, o'tkazuvchan kanal elektr maydon (kuchlanish) yordamida boshqariladi va statik tok deyarli sarflamaydi.",
        expertHint: "Elektr maydoni (zatvor kuchlanishi) orqali."
    },
    {
        id: "el_6_3",
        level: 6,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Zamonaviy kompyuter mikroprotsessorlari va xotiralarida nima sababdan CMOS (KMOP) texnologiyasi mutlaq yetakchi hisoblanadi?",
        options: ["Statik rejimda o'ta kam elektr quvvati sarflashi va mikrosxemalarni juda zich joylashtirish mumkinligi uchun","Ular simsiz ishlagani uchun","Ular faqat 1 voltda ishlagani uchun","Ular hech qachon qizib ketmagani uchun"],
        correct: 0,
        explanation: "CMOS n-kanal va p-kanal tranzistorlar juftligidan foydalanadi va faqat mantiqiy daraja almashgandagina (dinamik) energiya sarflaydi.",
        expertHint: "O'ta kam energiya sarfi va yuqori zichlik."
    },
    {
        id: "el_6_4",
        level: 6,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Maydoniy tranzistorlarning asosiy turlaridan biri bo'lgan JFET qisqartmasi nimani bildiradi?",
        options: ["Junction Field Effect Transistor (p-n o'tishli maydoniy tranzistor)","Joint Frequency Electronic Tube","Just Field Electric Terminal","Junior FET"],
        correct: 0,
        explanation: "JFET p-n o'tishdagi teskari kuchlanish orqali kanal kengligini boshqaruvchi klassik maydoniy tranzistordir.",
        expertHint: "Junction Field Effect Transistor (JFET)."
    },
    {
        id: "el_6_5",
        level: 6,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "N-kanalli MOSFET tranzistorni ochish va tok o'tkazishini ta'minlash uchun uning Zatvoriga (Gate) qanday kuchlanish beriladi?",
        options: ["Istokka (Source) nisbatan musbat kuchlanish (+)","Manfiy kuchlanish (-)","Nol volt","O'zgaruvchan 220V"],
        correct: 0,
        explanation: "Zatvorga musbat kuchlanish berilganda n-kanal hosil bo'ladi va tranzistor stok-istok orasida tok o'tkaza boshlaydi.",
        expertHint: "Musbat kuchlanish (+)."
    },
    {
        id: "el_6_6",
        level: 6,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Nima sababdan MOSFET tranzistorlar bilan ishlaganda statik elektr zaryadidan (ESD) ehtiyot bo'lish kerak?",
        options: ["Zatvor ostidagi dielektrik oksidi o'ta yupqa bo'lgani sababli hatto kichik statik uchqundan ham teshilib ishdan chiqishi mumkin","Ular portlab ketishi mumkin","Ular magnitlanib qoladi","Ular rangini o'zgartiradi"],
        correct: 0,
        explanation: "SiO2 dielektrik qatlami nanometrlar qalinligida bo'lib, statik yuqori kuchlanish uning dielektrik mustahkamligini teshib qo'yadi.",
        expertHint: "O'ta yupqa dielektrik qatlam teshilib ketishi mumkin."
    },
    {
        id: "el_7_1",
        level: 7,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        image: "assets/diagrams/logic_and_gate.svg",
        question: "O'zgaruvchan tokni o'zgarmas (bir yo'nalishli) tokka aylantiruvchi sxema nima deyiladi?",
        options: ["Invertor","Generator","To'g'rilagich (Vipryamitel / Rectifier)","Kompensator"],
        correct: 2,
        explanation: "Diodli ko'prikdan iborat to'g'rilagich sxemasi o'zgaruvchan tokni o'zgarmas tokka aylantiradi.",
        expertHint: "O'zgaruvchan tokni o'zgarmasga o'girish - To'g'rilagich (Rectifier)."
    },
    {
        id: "el_7_2",
        level: 7,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        image: "assets/diagrams/logic_or_gate.svg",
        question: "OR (YOKI) mantiqiy elementining chiqishida qachon mantiqiy 1 (yuqori sath) hosil bo'ladi?",
        options: ["Kirish signallarining kamida bittasi 1 bo'lganda","Faqat barcha kirishlar 1 bo'lgandagina","Faqat barcha kirishlar 0 bo'lganda","Kirishlar bir-biriga teng bo'lmaganda"],
        correct: 0,
        explanation: "OR (mantiqiy qo'shish) amali faqat barcha kirishlar 0 bo'lgandagina 0 beradi, qolgan barcha holatlarda (kamida bitta 1 bo'lsa) chiqishi 1 bo'ladi.",
        expertHint: "Kamida bitta kirish 1 bo'lsa kifoya."
    },
    {
        id: "el_7_3",
        level: 7,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "NOT (INKOR) mantiqiy elementining kirishiga mantiqiy 0 signali berilsa, uning chiqishida nima paydo bo'ladi?",
        options: ["Mantiqiy 1 (yuqori kuchlanish)","Mantiqiy 0","Cheksiz qarshilik","Sxema qisqa tutashuv bo'ladi"],
        correct: 0,
        explanation: "NOT (invertor) signali kirish qiymatini teskarisiga o'zgartiradi: kirish 0 bo'lsa chiqish 1 bo'ladi.",
        expertHint: "0 ning inkori 1 bo'ladi."
    },
    {
        id: "el_7_4",
        level: 7,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "NAND (VA-EMAS) mantiqiy elementining chiqishida qachon mantiqiy 0 hosil bo'ladi?",
        options: ["Faqat barcha kirish signallari 1 bo'lgandagina","Faqat barcha kirishlar 0 bo'lganda","Kamida bitta kirish 0 bo'lganda","Har doim 0 bo'ladi"],
        correct: 0,
        explanation: "NAND elementi AND ning inkoridir: barcha kirishlar 1 bo'lganda AND=1 bo'ladi, uning inkori esa 0 chiqadi.",
        expertHint: "Faqat hamma kirish 1 bo'lganda chiqish 0 bo'ladi."
    },
    {
        id: "el_7_5",
        level: 7,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "NOR (YOKI-EMAS) mantiqiy elementining chiqishida qachon mantiqiy 1 paydo bo'ladi?",
        options: ["Faqat barcha kirish signallari 0 bo'lgandagina","Faqat barcha kirishlar 1 bo'lganda","Kamida bitta kirish 1 bo'lganda","Hech qachon 1 bo'lmaydi"],
        correct: 0,
        explanation: "NOR elementi OR ning inkoridir: barcha kirishlar 0 bo'lsa OR=0 bo'ladi, inkor qilinganda esa 1 hosil bo'ladi.",
        expertHint: "Faqat hamma kirish 0 bo'lgandagina 1 chiqadi."
    },
    {
        id: "el_7_6",
        level: 7,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Raqamli TTL mikrosxemalarda mantiqiy 1 (yuqori sath) odatda necha voltli kuchlanishga to'g'ri keladi?",
        options: ["Taxminan +5 Volt (yoki 3.3V zamonaviy CMOS da)","220 Volt","0 Volt","-12 Volt"],
        correct: 0,
        explanation: "Klassik raqamli TTL mantiqda mantiqiy 0 bu 0V atrofida, mantiqiy 1 esa +5V (yoki zamonaviy tejamkor chiplarda 3.3V / 1.8V) kuchlanishdir.",
        expertHint: "+5 Volt (yoki 3.3V)."
    },
    {
        id: "img_el_7",
        level: 7,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        image: "assets/diagrams/logic_and_gate.svg",
        question: "Suratda ko'rsatilgan mantiqiy elementning grafik shartli belgisi qaysi elementga tegishli?",
        options: ["AND (VA) mantiqiy elementi","OR (YOKI) elementi","NOT (Invertor) elementi","XOR elementi"],
        correct: 0,
        explanation: "To'g'ri to'rtburchak va yarim aylana shaklidagi ushbu xalqaro standart belgi AND (VA) kon'yunksiya elementiga tegishlidir.",
        expertHint: "Suratdagi belgi AND (VA) elementidir: Y = A · B."
    },
    {
        id: "el_8_1",
        level: 8,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Kirxgoffning 1-qonuni (tugunlar qoidasi) nimani bildiradi?",
        options: ["Tugunga kiruvchi toklar yig'indisi chiquvchi toklar yig'indisiga teng","Zanjirdagi hamma qarshiliklar teng","Kuchlanish doim pasayadi","Tok kuchi ortadi"],
        correct: 0,
        explanation: "Zaryad saqlanishi: tugunga kiruvchi toklar yig'indisi chiquvchi toklarga teng (Σ I = 0).",
        expertHint: "Tugunga kirgan tok teng chiquvchi tok - Kirxgoffning 1-qonuni."
    },
    {
        id: "el_8_2",
        level: 8,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Demultiplekser (DEMUX) mantiqiy sxemasi qanday vazifani bajaradi?",
        options: ["Yagona axborot kirishidagi signalni boshqaruvchi kodga qarab bir nechta chiqish yo'llaridan biriga yo'naltiradi","Ko'p signallarni bittaga jamlaydi","Kuchlanishni 2 barobar oshiradi","Signallarni analogga aylantiradi"],
        correct: 0,
        explanation: "DEMUX multiplekserning aksi bo'lib, 1 ta kirish kanalidagi ma'lumotni tanlangan N ta chiqishdan birontasiga kommutatsiya qiladi.",
        expertHint: "1 ta kirishni bir nechta chiqishlardan biriga yo'naltiradi."
    },
    {
        id: "el_8_3",
        level: 8,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Raqamli elektronikadagi Deshifrator (Decoder) mikrosxemasi nima uchun ishlatiladi?",
        options: ["Kirishdagi n-bitli ikkilik kodni 2^n ta chiqish liniyasining mos bittasini faollashtirishga aylantirish uchun","Faqat parollarni yashirish uchun","Chastotani pasaytirish uchun","Signallarni shovqindan tozalash uchun"],
        correct: 0,
        explanation: "Deshifrator masalan 3 bitli kodni (000 dan 111 gacha) qabul qilib, 8 ta chiqish simining aynan tegishlisiga mantiqiy 1 chiqaradi.",
        expertHint: "Ikkilik kodni tegishli chiqish liniyasiga aylantirib faollashtiradi."
    },
    {
        id: "el_9_1",
        level: 9,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Raqamli sxemalarda 1 bit ma'lumotni xotirada saqlovchi elementar mantiqiy sxema nima?",
        options: ["Multipleksor","Trigger (Flip-flop)","Komparator","Shifrator"],
        correct: 1,
        explanation: "Trigger (RS, D, JK) ikkita barqaror holatga ega bo'lib, 1 bit saqlovchi eng kichik xotira katagidir.",
        expertHint: "1 bit saqlovchi mantiqiy katak - Trigger (Flip-flop)."
    },
    {
        id: "el_9_2",
        level: 9,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "D-trigger (Data trigger) raqamli zanjirlarda asosan qanday eng muhim rolni o'ynaydi?",
        options: ["Sinxron takt signali kelganda kirishdagi 1 bitlik ma'lumotni eslab qolish (xotira yacheykasi bo'lib xizmat qilish)","Chastotani ko'paytirish","O'zgarmas tokni to'g'rilash","Qisqa tutashuvdan himoya qilish"],
        correct: 0,
        explanation: "D-trigger takt (clock) impulsining frontida kirishdagi D qiymatini chiqishga uzatadi va keyingi taktga qadar saqlaydi, bu registrlar asosi hisoblanadi.",
        expertHint: "1 bitlik ma'lumotni xotirada saqlash."
    },
    {
        id: "el_9_3",
        level: 9,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "JK-triggerning oddiy RS-triggerga nisbatan bosh ustunligi nimada?",
        options: ["Unda hech qanday taqiqlangan noaniq holat yo'q (J=1, K=1 bo'lganda trigger o'z holatini teskarisiga o'zgartiradi)","U elektr toki talab qilmaydi","U faqat analog signallar bilan ishlaydi","Uning o'lchami 10 barobar kichik"],
        correct: 0,
        explanation: "RS-triggerda R=1, S=1 holati noaniq va taqiqlangan edi. JK-triggerda esa J=1, K=1 bo'lganda chiqish har taktda invertlanadi (hisoblagich rejimi).",
        expertHint: "Taqiqlangan holat yo'q, J=1, K=1 da teskarisiga o'tadi."
    },
    {
        id: "el_10_1",
        level: 10,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Bir nechta kirish signallaridan bittasini tanlab yagona chiqishga uzatuvchi selektor qurilma nima?",
        options: ["Demultipleksor","Multipleksor (MUX)","Summator","Dekoder"],
        correct: 1,
        explanation: "Multipleksor (MUX) ko'p kirish liniyalaridan birini tanlab bitta chiqishga ulaydi.",
        expertHint: "Ko'pdan birni tanlovchi selektor - Multipleksor (MUX)."
    },
    {
        id: "el_10_2",
        level: 10,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Ideal operatsion kuchaytirgichning (Op-Amp) chiqish qarshiligi (R_out) qanday bo'lishi kerak?",
        options: ["Nolga teng (R_out = 0)","Cheksiz katta","1 Megaom","100 Om"],
        correct: 0,
        explanation: "Ideal operatsion kuchaytirgichning kirish qarshiligi cheksiz katta (oqim kirmaydi), chiqish qarshiligi esa ideal holda nolga teng bo'ladi.",
        expertHint: "Chiqish qarshiligi nolga (0) teng bo'ladi."
    },
    {
        id: "el_10_3",
        level: 10,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Operatsion kuchaytirgich asosidagi Komparator sxemasi nima vazifani bajaradi?",
        options: ["Ikkita kirish kuchlanishini o'zaro solishtirib, qaysi biri kattaligiga qarab chiqishda yuqori yoki quyi mantiqiy daraja hosil qiladi","Ikki chastotani qo'shadi","Signallarni integrallaydi","Kuchlanishni 1000 barobar pasaytiradi"],
        correct: 0,
        explanation: "Komparator analog signalni ma'lum bir tayanch kuchlanish bilan solishtirib, natijani 0 yoki 1 ko'rinishidagi raqamli signalga aylantiradi.",
        expertHint: "Ikkita kuchlanishni solishtirib mantiqiy 0 yoki 1 chiqaradi."
    },
    {
        id: "el_11_1",
        level: 11,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Ideal operatsion kuchaytirgich (Op-Amp) ning kirish qarshiligi qanday deb qabul qilinadi?",
        options: ["Nolga teng","Cheksiz katta (∞)","1 Om","100 Om"],
        correct: 1,
        explanation: "Ideal Op-Amp kirishidan tok olmaydi, shuning uchun kirish qarshiligi cheksizlikka teng deb olinadi.",
        expertHint: "Ideal Op-Amp da kirish qarshiligi cheksiz katta (∞)."
    },
    {
        id: "el_11_2",
        level: 11,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Yuqori chastotali filtr (HPF - High Pass Filter) qanday chastotali signallarni o'tkazadi?",
        options: ["Chegara (kesish) chastotasidan yuqori chastotali signallarni o'tkazadi va past chastotalarni so'ndiradi","Faqat o'zgarmas tokni o'tkazadi","Barcha chastotalarni bir xil o'tkazadi","Faqat 50 Hz chastotani o'tkazadi"],
        correct: 0,
        explanation: "HPF kesish chastotasi f_c dan yuqori bo'lgan spektrni kam yo'qotish bilan o'tkazadi, past chastotalarni (shu jumladan o'zgarmas tokni) to'sadi.",
        expertHint: "Kesish chastotasidan yuqori chastotalarni o'tkazadi."
    },
    {
        id: "el_11_3",
        level: 11,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "LC tebranish konturida rezonans hodisasi yuz berishi uchun qaysi shart bajarilishi kerak?",
        options: ["G'altakning induktiv qarshiligi kondensatorning sig'im qarshiligiga teng bo'lishi kerak: X_L = X_C","Qarshiliklar cheksiz bo'lishi kerak","Tok kuchi nolga tushishi kerak","Faqat o'zgarmas kuchlanish berilishi kerak"],
        correct: 0,
        explanation: "Rezonans chastotasida omega*L = 1/(omega*C) bo'ladi, ya'ni induktiv va sig'im reaktiv qarshiliklari bir-birini kompensatsiya qiladi.",
        expertHint: "Induktiv va sig'im qarshiliklari tenglashganda: X_L = X_C."
    },
    {
        id: "el_12_1",
        level: 12,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Ikkilik (binar) sonlarni qo'shuvchi raqamli mantiqiy blok qaysi?",
        options: ["Tranzistor","Registr","Summator (Adder)","Hisoblagich"],
        correct: 2,
        explanation: "Summator protsessorda ikkilik sonlarni arifmetik qo'shish uchun xizmat qiladi.",
        expertHint: "Sonlarni qo'shish vositasi - Summator (Adder)."
    },
    {
        id: "el_12_2",
        level: 12,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Kotelnikov-Shennon (Naykvist) teoremasiga ko'ra analog signalni raqamlashtirishda diskretlash chastotasi (f_d) qanday bo'lishi shart?",
        options: ["Signalning eng yuqori chastotasidan kamida 2 barobar katta bo'lishi shart: f_d >= 2 * f_max","Eng yuqori chastotadan 2 barobar kichik bo'lishi kerak","Chastotaga bog'liq emas","Doimo 1000 Hz bo'lishi kerak"],
        correct: 0,
        explanation: "Signalni yo'qotishlarsiz va buzilishlarsiz (aliasing bo'lmasdan) qayta tiklash uchun diskretlash chastotasi signal spektri maksimal chastotasining kamida ikkilanganiga teng bo'lishi kerak.",
        expertHint: "Maksimal chastotadan kamida 2 barobar katta: f_d >= 2 * f_max."
    },
    {
        id: "el_12_3",
        level: 12,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Elektronikadagi 'R-2R matritsali' zanjir asosan qaysi qurilma asosida aniq analog signal yaratish uchun qo'llaniladi?",
        options: ["DAC (Raqamli-analog o'zgartirgich / Digital-to-Analog Converter)","Kabel ulagichi","Transformator","Quyosh paneli"],
        correct: 0,
        explanation: "R-2R zanjiri faqat ikki xil aniq qiymatli (R va 2R) rezistorlardan foydalanib, ikkilik raqamli kodni silliq analog kuchlanishga aylantiruvchi qulay DAC arxitekturasidir.",
        expertHint: "DAC (Raqamli-analog o'zgartirgich)."
    },
    {
        id: "el_13_1",
        level: 13,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Zamonaviy protsessorlar va mikrochiplarda eng kam energiya sarflovchi asosiy tranzistor texnologiyasi qaysi?",
        options: ["CMOS (KMOP)","Bipolyar TTL","Germaniyli tranzistor","Vakuum lampa"],
        correct: 0,
        explanation: "CMOS statik holatda quvvat iste'mol qilmaydi va zamonaviy barcha mikrochiplarning asosidir.",
        expertHint: "Barcha zamonaviy chiplar CMOS texnologiyasiga qurilgan."
    },
    {
        id: "el_13_2",
        level: 13,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Doimiy xotira (ROM - Read-Only Memory) mikrosxemalarining tezkor xotiradan (RAM) tub farqi nimada?",
        options: ["Energiya ta'minoti butunlay uzilganda ham undagi ma'lumotlar o'chib ketmasdan saqlanib qoladi (energomustaqil)","U faqat audio yozish uchun ishlatiladi","Uning ichida kondensatorlar bo'ladi","U faqat bir marta o'qiladi va yonib ketadi"],
        correct: 0,
        explanation: "ROM energomustaqil (non-volatile) xotira bo'lib, BIOS, mikrodasturlar va firmware larni kompyuter o'chirilganda ham xotirada saqlaydi.",
        expertHint: "Elektr o'chsa ham ma'lumotlar saqlanib qoladi (energomustaqil)."
    },
    {
        id: "el_13_3",
        level: 13,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "FPGA (Field Programmable Gate Array) mikrosxemalarining klassik protsessorlardan (CPU) tub afzalligi nimada?",
        options: ["Uning apparat mantiqiy bloklari va ulanishlari dasturchi tomonidan apparat darajasida parallel algoritmlarga moslab qayta konfiguratsiya qilinadi","Ular elektrsiz ishlaydi","Ularda tranzistorlar bo'lmaydi","Ular faqat 1 bitli ma'lumotlar bilan ishlaydi"],
        correct: 0,
        explanation: "FPGA mikrosxemasining ichki tuzilishini dasturchi Verilog/VHDL yordamida o'zi xohlagancha parallel apparat sxemalariga aylantira oladi.",
        expertHint: "Apparat tuzilishining o'zini dasturiy qayta dasturlash imkoniyati."
    },
    {
        id: "el_14_1",
        level: 14,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Teskari kuchlanishda ishlab, sxemada kuchlanishni aniq me'yorda barqarorlashtiruvchi diod qaysi?",
        options: ["Varikap","Fotodiod","Stabilitron (Zener diod)","Tunel diod"],
        correct: 2,
        explanation: "Stabilitron (Zener diod) kuchlanishni barqaror ushlab turish uchun ishlatiladi.",
        expertHint: "Kuchlanish stabilizatori bu Stabilitron (Zener diod)."
    },
    {
        id: "el_14_2",
        level: 14,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Shmitt triggerining (Schmitt Trigger) oddiy komparatorlardan tub farqi va afzalligi nimada?",
        options: ["U gisterezis xususiyatiga (ikkita turli yoqish va o'chirish chegarasiga) ega bo'lib, shovqinli signallarni toza to'rtburchak impulslarga aylantiradi","U kuchlanishni 1000 voltga oshiradi","U faqat o'zgarmas tokda ishlaydi","U hech qachon chiqish signalini o'zgartirmaydi"],
        correct: 0,
        explanation: "Gisterezis orqali Shmitt triggeri kirishdagi shovqinlar paytida chiqishning ko'p marta miltillab xato ulanishlarining (chattering) oldini oladi.",
        expertHint: "Gisterezis xossasi (shovqinga chidamlilik)."
    },
    {
        id: "el_14_3",
        level: 14,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Impulsli 'Step-Down' (Buck) kuchlanish konverterining chiziqli stabilizatorlarga (masalan 7805) nisbatan bosh afzalligi nima?",
        options: ["O'ta yuqori foydali ish koeffitsiyenti (90-95% gacha) va issiqlik sifatida minimal energiya isrof bo'lishi","U radio signallarini ushlamasligi","Uning sxemasida kondensator kerak emasligi","U faqat AC tokda ishlashi"],
        correct: 0,
        explanation: "Buck konverter PWM kalitlash va induktivlik yordamida kuchlanishni deyarli qizib ketmasdan, 90%+ FIK bilan pasaytiradi.",
        expertHint: "Yuqori FIK (90%+) va juda kam qizish."
    },
    {
        id: "el_15_1",
        level: 15,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Apparat darajasida qayta dasturlanuvchi mantiqiy integral mikrosxema nima deyiladi?",
        options: ["ASIC","FPGA (Field-Programmable Gate Array)","ROM","DRAM"],
        correct: 1,
        explanation: "FPGA mikrosxemasining ichki tuzilishini dasturchi Verilog/VHDL yordamida o'zi xohlagancha o'zgartira oladi.",
        expertHint: "Dasturlanuvchi apparat mikrosxemasi bu FPGA."
    },
    {
        id: "el_15_2",
        level: 15,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Yarimo'tkazgichlar sanoatidagi mashhur 'Mur qonuni' (Moore's Law) nimani bashorat qilgan edi?",
        options: ["Yagona integral mikrosxema kristaliga joylashtiriladigan tranzistorlar soni taxminan har ikki yilda ikki barobar ortadi","Protsessorlar narxi har yili 2 barobar qimmatlashadi","Tranzistorlar o'lchami har doim o'zgarmay qoladi","Kompyuter xotirasi 10 yildan keyin tugaydi"],
        correct: 0,
        explanation: "Gordon Mur 1965 yilda integral sxemalardagi tranzistorlar zichligi eksponentsial o'sib, har 18-24 oyda 2 karra ortishini ilgari surgan.",
        expertHint: "Tranzistorlar soni har 2 yilda 2 barobar ortishi."
    },
    {
        id: "el_15_3",
        level: 15,
        category: "electronics",
        categoryName: "Elektronika va sxemalar",
        question: "Emitter-bog'langan mantiq (ECL - Emitter-Coupled Logic) mikrosxemalarining boshqa mantiqiy oilalardan eng ustun tomoni nima?",
        options: ["Tranzistorlar to'yinish (saturation) chuqur rejimiga kirmaganligi sababli pikosekundli o'ta yuqori kommutatsiya tezligi","Ularning deyarli elektr toki sarflamasligi","Ularning faqat bitta tranzistordan tuzilishi","Ularning arzon plastikdan yasalishi"],
        correct: 0,
        explanation: "ECL differensial kuchaytirgich rejimida ishlaydi, tranzistorlar chuqur to'yinishga bormagani uchun qayta ulanish vaqti minimal (o'ta tez) bo'ladi.",
        expertHint: "To'yinish rejimiga kirmagani sababli o'ta yuqori kommutatsiya tezligi."
    }
];

// Prize tree levels adapted for ATT students
const PRIZE_LADDER = [
    { level: 1,  amount: 500000,     formatted: "500,000 so'm",       tier: "1-Kurs Talaba",       guaranteed: false },
    { level: 2,  amount: 1000000,    formatted: "1,000,000 so'm",     tier: "Junior Dasturchi",    guaranteed: false },
    { level: 3,  amount: 2000000,    formatted: "2,000,000 so'm",     tier: "Tarmoq Administratori", guaranteed: false },
    { level: 4,  amount: 3000000,    formatted: "3,000,000 so'm",     tier: "Baza Muhandisi",      guaranteed: false },
    { level: 5,  amount: 5000000,    formatted: "5,000,000 so'm",     tier: "ATT Sertifikatlangan Mutaxassis", guaranteed: true },
    { level: 6,  amount: 10000000,   formatted: "10,000,000 so'm",    tier: "Middle Dev",          guaranteed: false },
    { level: 7,  amount: 20000000,   formatted: "20,000,000 so'm",    tier: "Sxemotexnik Muhandis", guaranteed: false },
    { level: 8,  amount: 35000000,   formatted: "35,000,000 so'm",    tier: "Tarmoq Arxitektori",  guaranteed: false },
    { level: 9,  amount: 50000000,   formatted: "50,000,000 so'm",    tier: "Senior IT Mutaxassis", guaranteed: false },
    { level: 10, amount: 100000000,  formatted: "100,000,000 so'm",   tier: "ATT Bosh Muhandis",   guaranteed: true },
    { level: 11, amount: 150000000,  formatted: "150,000,000 so'm",   tier: "Tizim Analitigi",     guaranteed: false },
    { level: 12, amount: 250000000,  formatted: "250,000,000 so'm",   tier: "Katta Ilmiy Xodim",   guaranteed: false },
    { level: 13, amount: 400000000,  formatted: "400,000,000 so'm",   tier: "IT Direktor (CTO)",   guaranteed: false },
    { level: 14, amount: 600000000,  formatted: "600,000,000 so'm",   tier: "Akademik Ekspert",    guaranteed: false },
    { level: 15, amount: 1000000000, formatted: "1,000,000,000 so'm", tier: "ATT Oliy Toifa Magnat / Bitiruvchi", guaranteed: true }
];

// Helper: Generates 15 game questions with randomized options and anti-repetition filter
function generateGameQuestions(selectedCategory = 'all', customQuestions = []) {
    const fullBank = [...QUESTION_BANK, ...customQuestions];
    const selectedQuestions = [];
    const seenIds = new Set(getSeenQuestionIds());
    const newlyUsedIds = [];

    for (let lvl = 1; lvl <= 15; lvl++) {
        let pool = fullBank.filter(q => q.level === lvl);
        
        // Filter by subject if specific
        if (selectedCategory && selectedCategory !== 'all') {
            const subjectPool = pool.filter(q => q.category === selectedCategory);
            if (subjectPool.length > 0) {
                pool = subjectPool;
            }
        }

        // Anti-repetition: prefer questions not seen in recent games
        let availablePool = pool.filter(q => !seenIds.has(q.id));
        if (availablePool.length === 0) {
            // When all questions for this subject/level have been seen, reset this slice
            pool.forEach(q => seenIds.delete(q.id));
            availablePool = pool;
        }

        if (availablePool.length > 0) {
            const randomIndex = Math.floor(Math.random() * availablePool.length);
            const chosen = availablePool[randomIndex];
            const questionCopy = JSON.parse(JSON.stringify(chosen));
            
            // Randomize options order so the correct answer is NOT always A!
            shuffleQuestion(questionCopy);
            selectedQuestions.push(questionCopy);
            seenIds.add(chosen.id);
            newlyUsedIds.push(chosen.id);
        } else {
            // Safe fallback
            const fallbackQ = {
                id: `fallback_${lvl}`,
                level: lvl,
                category: selectedCategory || 'general',
                categoryName: 'ATT Nazorat Savoli',
                question: `${lvl}-bosqich ATT nazorat savoli. Qaysi javob to'g'ri?`,
                options: ["To'g'ri muhandislik yechimi", "Noto'g'ri variant", "Chalg'ituvchi variant", "Qoniqarsiz variant"],
                correct: 0,
                explanation: "Tizim zaxira savoli.",
                expertHint: "Menimcha to'g'ri javob aniq."
            };
            shuffleQuestion(fallbackQ);
            selectedQuestions.push(fallbackQ);
        }
    }
    markQuestionsAsSeen(newlyUsedIds);
    return selectedQuestions;
}

// Helper: Get a fresh replacement question for "Almashtir" lifeline
function getReplacementQuestion(currentQuestion, selectedCategory = 'all', currentGameQuestions = []) {
    if (!currentQuestion) return null;
    const currentLvl = currentQuestion.level;
    const currentGameIds = new Set(currentGameQuestions.map(q => q.id));
    currentGameIds.add(currentQuestion.id);

    let pool = QUESTION_BANK.filter(q => q.level === currentLvl && !currentGameIds.has(q.id));

    // Prefer same subject
    if (selectedCategory && selectedCategory !== 'all') {
        const subjectPool = pool.filter(q => q.category === selectedCategory);
        if (subjectPool.length > 0) {
            pool = subjectPool;
        }
    } else if (currentQuestion.category) {
        // In mixed mode, try to match the replaced question's category if possible
        const sameCatPool = pool.filter(q => q.category === currentQuestion.category);
        if (sameCatPool.length > 0) {
            pool = sameCatPool;
        }
    }

    const seenIds = new Set(getSeenQuestionIds());
    let availablePool = pool.filter(q => !seenIds.has(q.id));
    if (availablePool.length === 0) {
        availablePool = pool;
    }

    if (availablePool.length === 0) {
        availablePool = QUESTION_BANK.filter(q => q.level === currentLvl && q.id !== currentQuestion.id);
    }

    if (availablePool.length > 0) {
        const chosen = availablePool[Math.floor(Math.random() * availablePool.length)];
        const copy = JSON.parse(JSON.stringify(chosen));
        shuffleQuestion(copy);
        markQuestionsAsSeen([copy.id]);
        return copy;
    }
    return null;
}
