import baseSite from '../../content/site.json' with { type: 'json' };

export const supportedLocales = ['en', 'de', 'ar', 'tr'];
export const defaultLocale = 'en';

export const localeNames = {
  en: 'English',
  de: 'Deutsch',
  ar: 'العربية',
  tr: 'Türkçe',
};

export const localeMeta = {
  en: { dir: 'ltr', og: 'en_US' },
  de: { dir: 'ltr', og: 'de_DE' },
  ar: { dir: 'rtl', og: 'ar_AR' },
  tr: { dir: 'ltr', og: 'tr_TR' },
};

export function normalizeLocale(locale = '') {
  const language = String(locale).toLowerCase().split(/[-_]/)[0];
  return supportedLocales.includes(language) ? language : defaultLocale;
}

export function localizedPath(pathname, locale) {
  const target = normalizeLocale(locale);
  const clean = `/${String(pathname || '/').replace(/^\/+|\/+$/g, '')}/`;
  const parts = clean.split('/').filter(Boolean);
  if (supportedLocales.includes(parts[0])) parts.shift();
  return `/${[target, ...parts].join('/')}/`;
}

const english = {
  ...baseSite,
  role: 'AI & Digital Transformation Consultant',
  headline: { lead: 'I turn complex operations into', emphasis: 'working AI systems' },
  tagline: 'I help organizations use AI and automation to reduce operating costs, save time and improve service delivery.',
  about: [
    'I work between business requirements and technical delivery. That means clarifying the problem, defining what should be automated, choosing an architecture and guiding the work until it is useful in production.',
    'My recent work focuses on document intelligence, LLM agents and enterprise knowledge systems. Three production parsers exceed 90% field-level accuracy across invoices, emails and timesheets.',
    'Earlier, I delivered computer-vision systems for roads, tunnels, rail crossings and port operations. Those projects taught me to judge technology by operational outcomes: response time, reliability, adoption and risk, not only benchmark accuracy.',
  ],
  links: [{ ...baseSite.links[0], label: 'Connect on LinkedIn' }],
  stats: [
    { value: '7+', label: 'Years delivering applied AI' },
    { value: '3', label: 'Document tools in production' },
    { value: '90%+', label: 'Production extraction accuracy' },
  ],
  experience: [
    {
      ...baseSite.experience[0],
      role: 'AI Solutions Engineer · Consulting & Delivery Focus',
      end: 'Sep 2026',
      summary: 'Advisory, architecture and delivery for enterprise document intelligence and agentic AI.',
      points: [
        'Led discovery and delivery for invoice, email and timesheet automation, translating operational workflows into scoped services and measurable acceptance criteria.',
        'Delivered three document-intelligence tools at 90%+ field-level accuracy and integrated them into existing operational workflows.',
        'Designed agentic extraction and knowledge-graph pipelines, with reviewable decisions and stable APIs that other product teams could adopt.',
        'Contributed to enterprise software delivery within innoscripta’s ISO/IEC 27001:2022-certified information security management system, with attention to access control, traceability, data integrity, and secure delivery.',
      ],
    },
    {
      ...baseSite.experience[1],
      role: 'ML Solutions Engineer · Applied AI Delivery',
      summary: 'Solution design and field delivery for transport, safety and industrial computer-vision systems.',
      points: [
        'Delivered real-time incident detection for highways and tunnels with Intel and fortiss, balancing latency, false alerts and roadside hardware constraints.',
        'Contributed to a 3D container-scanning system for an Istanbul port, improving throughput while reducing misreads.',
        'Supported Huawei rail-safety deployments in Serbia and delivered roadside information systems across several Turkish cities.',
      ],
    },
  ],
};

const german = {
  ...english,
  role: 'Berater für KI und digitale Transformation',
  availableLabel: 'Offen für neue Projekte',
  headline: { lead: 'Ich verwandle komplexe Abläufe in', emphasis: 'produktive KI-Systeme' },
  location: 'Türkei · Dubai · Damaskus · Weltweit remote',
  tagline: 'Ich unterstütze Organisationen dabei, mit KI und Automatisierung Betriebskosten zu senken, Zeit zu sparen und Services besser umzusetzen.',
  about: [
    'Ich arbeite an der Schnittstelle zwischen Geschäftsanforderungen und technischer Umsetzung. Dazu gehören die Klärung des Problems, die Auswahl sinnvoller Automatisierung, die Definition der Architektur und die Begleitung bis zum produktiven Nutzen.',
    'Mein aktueller Schwerpunkt liegt auf Dokumentenintelligenz, LLM-Agenten und Wissenssystemen für Unternehmen. Drei produktive Parser für Rechnungen, E-Mails und Stundenzettel erreichen über 90 % Genauigkeit auf Feldebene.',
    'Zuvor habe ich Computer-Vision-Systeme für Straßen, Tunnel, Bahnübergänge und Hafenprozesse umgesetzt. Entscheidend sind für mich operative Ergebnisse wie Reaktionszeit, Zuverlässigkeit, Akzeptanz und Risiko – nicht nur Modellgenauigkeit.',
  ],
  links: [{ ...english.links[0], label: 'Auf LinkedIn vernetzen' }],
  stats: [
    { value: '7+', label: 'Jahre in der KI-Umsetzung' },
    { value: '3', label: 'Dokumentenwerkzeuge in Produktion' },
    { value: '90 %+', label: 'Extraktionsgenauigkeit im Betrieb' },
  ],
  skills: english.skills.map((group, index) => ({
    ...group,
    group: ['LLM-Systeme', 'ML & Computer Vision', 'Backend', 'Infrastruktur', 'Datenspeicher'][index],
  })),
  experience: [
    {
      ...english.experience[0],
      role: 'AI Solutions Engineer · Beratung & Umsetzung',
      location: 'Deutschland · Hybrid',
      summary: 'Beratung, Architektur und Umsetzung für Dokumentenintelligenz und agentische KI im Unternehmen.',
      points: [
        'Leitete Analyse und Umsetzung der Automatisierung von Rechnungen, E-Mails und Stundenzetteln und überführte operative Abläufe in klar abgegrenzte Services mit messbaren Abnahmekriterien.',
        'Brachte drei Werkzeuge für Dokumentenintelligenz mit über 90 % Genauigkeit auf Feldebene in Produktion und integrierte sie in bestehende Betriebsabläufe.',
        'Konzipierte agentische Extraktions- und Knowledge-Graph-Pipelines mit nachvollziehbaren Entscheidungen und stabilen Schnittstellen für andere Produktteams.',
        'Wirkte an der Bereitstellung von Unternehmenssoftware im Rahmen des nach ISO/IEC 27001:2022 zertifizierten Informationssicherheitsmanagementsystems von innoscripta mit, mit besonderem Augenmerk auf Zugriffskontrolle, Nachvollziehbarkeit, Datenintegrität und sichere Bereitstellung.',
      ],
    },
    {
      ...english.experience[1],
      role: 'ML Solutions Engineer · Angewandte KI',
      location: 'Türkei · Hybrid',
      summary: 'Lösungsdesign und Feldauslieferung für Computer Vision in Verkehr, Sicherheit und Industrie.',
      points: [
        'Realisierte mit Intel und fortiss Echtzeit-Störfallerkennung für Autobahnen und Tunnel unter Berücksichtigung von Latenz, Fehlalarmen und Edge-Hardware.',
        'Wirkte an einem 3D-Containerscanner für einen Istanbuler Hafen mit, der den Durchsatz erhöhte und Fehlablesungen reduzierte.',
        'Unterstützte Huawei bei Bahnsicherheitslösungen in Serbien und lieferte Verkehrsinformationssysteme in mehreren türkischen Städten aus.',
      ],
    },
  ],
  education: [
    { ...english.education[0], degree: 'MSc, Nachhaltige Umwelt- und Energiesysteme' },
    { ...english.education[1], degree: 'BSc, Mechatronik und Automatisierungstechnik' },
  ],
  languages: [
    { name: 'Arabisch', level: 'Muttersprache' },
    { name: 'Türkisch', level: 'Muttersprache' },
    { name: 'Englisch', level: 'Fließend' },
    { name: 'Deutsch', level: 'Grundkenntnisse' },
  ],
};

const arabic = {
  ...english,
  role: 'مستشار الذكاء الاصطناعي والتحول الرقمي',
  availableLabel: 'متاح لمشاريع جديدة',
  headline: { lead: 'أحوّل العمليات المعقدة إلى', emphasis: 'أنظمة ذكاء اصطناعي عملية' },
  location: 'تركيا · دبي · دمشق · عن بُعد حول العالم',
  tagline: 'أساعد المؤسسات على استخدام الذكاء الاصطناعي والأتمتة لخفض تكاليف التشغيل وتوفير الوقت وتحسين تقديم الخدمات.',
  about: [
    'أعمل عند نقطة الالتقاء بين احتياجات الأعمال والتنفيذ التقني: أوضح المشكلة، أحدد ما يستحق الأتمتة، أصمم بنية الحل، وأوجّه التنفيذ حتى يحقق قيمة حقيقية في بيئة الإنتاج.',
    'يركز عملي الحديث على فهم المستندات ووكلاء النماذج اللغوية وأنظمة المعرفة المؤسسية. تتجاوز دقة ثلاثة محللات قيد الإنتاج للفواتير والبريد وسجلات الوقت نسبة 90٪ على مستوى الحقول.',
    'سبق أن نفذت أنظمة رؤية حاسوبية للطرق والأنفاق ومعابر السكك الحديدية وعمليات الموانئ. لذلك أقيس نجاح التقنية بزمن الاستجابة والموثوقية والتبني والمخاطر، لا بدقة النموذج وحدها.',
  ],
  links: [{ ...english.links[0], label: 'تواصل عبر لينكدإن' }],
  stats: [
    { value: '+7', label: 'سنوات في تنفيذ حلول الذكاء الاصطناعي' },
    { value: '3', label: 'أدوات مستندات قيد الإنتاج' },
    { value: '+90٪', label: 'دقة الاستخراج في الإنتاج' },
  ],
  skills: english.skills.map((group, index) => ({
    ...group,
    group: ['أنظمة النماذج اللغوية', 'التعلم الآلي والرؤية الحاسوبية', 'الخدمات الخلفية', 'البنية التحتية', 'مخازن البيانات'][index],
  })),
  experience: [
    {
      ...english.experience[0],
      role: 'مهندس حلول ذكاء اصطناعي · استشارات وتنفيذ',
      location: 'ألمانيا · عمل هجين',
      summary: 'استشارات وهندسة وتنفيذ حلول فهم المستندات والذكاء الاصطناعي الوكيلي للمؤسسات.',
      points: [
        'قدت تحليل وتنفيذ أتمتة الفواتير والبريد الإلكتروني وسجلات الوقت، وحولت سير العمل التشغيلي إلى خدمات محددة ومعايير قبول قابلة للقياس.',
        'أطلقت ثلاثة أدوات لفهم المستندات بدقة تتجاوز 90٪ على مستوى الحقول ودمجتها في سير العمل التشغيلي القائم.',
        'صممت مسارات استخراج وكُثُف معرفة تعتمد على الوكلاء، مع قرارات قابلة للمراجعة وواجهات مستقرة يمكن لفرق المنتجات الأخرى استخدامها.',
        'ساهمت في تقديم برمجيات مؤسسية ضمن نظام إدارة أمن المعلومات لدى innoscripta الحاصل على شهادة ISO/IEC 27001:2022، مع الاهتمام بالتحكم في الوصول وإمكانية التتبع وسلامة البيانات والتسليم الآمن.',
      ],
    },
    {
      ...english.experience[1],
      role: 'مهندس حلول تعلم آلي · تنفيذ الذكاء الاصطناعي التطبيقي',
      location: 'تركيا · عمل هجين',
      summary: 'تصميم الحلول وتنفيذ أنظمة الرؤية الحاسوبية للنقل والسلامة والبيئات الصناعية.',
      points: [
        'نفذت مع Intel وfortiss كشف الحوادث لحظياً على الطرق والأنفاق مع موازنة زمن الاستجابة والإنذارات الخاطئة وقيود الأجهزة الطرفية.',
        'ساهمت في نظام مسح ثلاثي الأبعاد للحاويات في ميناء بإسطنبول، فرفع الإنتاجية وخفّض أخطاء القراءة.',
        'دعمت مشاريع Huawei لسلامة السكك الحديدية في صربيا ونفذت أنظمة معلومات مرورية في عدة مدن تركية.',
      ],
    },
  ],
  education: [
    { ...english.education[0], degree: 'ماجستير في أنظمة البيئة والطاقة المستدامة' },
    { ...english.education[1], degree: 'بكالوريوس هندسة الميكاترونكس وأنظمة الأتمتة' },
  ],
  languages: [
    { name: 'العربية', level: 'لغة أم' },
    { name: 'التركية', level: 'لغة أم' },
    { name: 'الإنجليزية', level: 'بطلاقة' },
    { name: 'الألمانية', level: 'مبتدئ' },
  ],
};

const turkish = {
  ...english,
  role: 'Yapay Zekâ ve Dijital Dönüşüm Danışmanı',
  availableLabel: 'Yeni projelere açık',
  headline: { lead: 'Karmaşık operasyonları', emphasis: 'çalışan yapay zekâ sistemlerine dönüştürüyorum' },
  location: 'Türkiye · Dubai · Şam · Dünya çapında uzaktan',
  tagline: 'Kurumların yapay zekâ ve otomasyonla işletme maliyetlerini azaltmasına, zaman kazanmasına ve hizmet sunumunu iyileştirmesine yardımcı oluyorum.',
  about: [
    'İş ihtiyaçları ile teknik teslimat arasında çalışıyorum. Problemi netleştiriyor, neyin otomatikleştirilmesi gerektiğini belirliyor, çözüm mimarisini kuruyor ve üretimde değer sağlayana kadar uygulamayı yönlendiriyorum.',
    'Son dönemde belge zekâsı, LLM ajanları ve kurumsal bilgi sistemlerine odaklandım. Fatura, e-posta ve puantajları işleyen üç üretim ayrıştırıcısı alan bazında %90’ın üzerinde doğruluğa ulaştı.',
    'Daha önce yol, tünel, demiryolu geçidi ve liman operasyonları için bilgisayarlı görü sistemleri teslim ettim. Teknolojiyi yalnızca model doğruluğuyla değil; tepki süresi, güvenilirlik, benimsenme ve risk sonuçlarıyla değerlendiriyorum.',
  ],
  links: [{ ...english.links[0], label: 'LinkedIn’de bağlantı kur' }],
  stats: [
    { value: '7+', label: 'Uygulamalı yapay zekâ teslimatı' },
    { value: '3', label: 'Üretimde belge zekâsı aracı' },
    { value: '%90+', label: 'Üretimde veri çıkarma doğruluğu' },
  ],
  skills: english.skills.map((group, index) => ({
    ...group,
    group: ['LLM Sistemleri', 'ML ve Bilgisayarlı Görü', 'Backend', 'Altyapı', 'Veri Depoları'][index],
  })),
  experience: [
    {
      ...english.experience[0],
      role: 'AI Solutions Engineer · Danışmanlık ve Teslimat',
      location: 'Almanya · Hibrit',
      summary: 'Kurumsal belge zekâsı ve ajan tabanlı yapay zekâ için danışmanlık, mimari ve teslimat.',
      points: [
        'Fatura, e-posta ve puantaj otomasyonunda keşif ve teslimata liderlik ederek operasyonel süreçleri kapsamı net servislere ve ölçülebilir kabul kriterlerine dönüştürdüm.',
        'Alan bazında %90’ın üzerinde doğruluğa sahip üç belge zekâsı aracını üretime aldım ve mevcut operasyonel iş akışlarına entegre ettim.',
        'İncelenebilir kararlar ve diğer ürün ekiplerinin kullanabileceği kararlı API’lerle ajan tabanlı veri çıkarma ve bilgi grafiği hatları tasarladım.',
        'Erişim kontrolü, izlenebilirlik, veri bütünlüğü ve güvenli teslimata odaklanarak innoscripta’nın ISO/IEC 27001:2022 sertifikalı bilgi güvenliği yönetim sistemi kapsamında kurumsal yazılım teslimatına katkıda bulundum.',
      ],
    },
    {
      ...english.experience[1],
      role: 'ML Solutions Engineer · Uygulamalı Yapay Zekâ Teslimatı',
      location: 'Türkiye · Hibrit',
      summary: 'Ulaşım, güvenlik ve endüstriyel bilgisayarlı görü sistemleri için çözüm tasarımı ve saha teslimatı.',
      points: [
        'Intel ve fortiss ile otoyol ve tüneller için gerçek zamanlı olay tespiti teslim ederek gecikme, yanlış alarm ve uç donanım kısıtlarını dengeledim.',
        'İstanbul’daki bir liman için işlem kapasitesini artırıp hatalı okumaları azaltan 3B konteyner tarama sistemine katkı sağladım.',
        'Sırbistan’daki Huawei demiryolu güvenliği uygulamalarını destekledim ve birçok Türk şehrinde yol bilgilendirme sistemleri teslim ettim.',
      ],
    },
  ],
  education: [
    { ...english.education[0], degree: 'Yüksek Lisans, Sürdürülebilir Çevre ve Enerji Sistemleri' },
    { ...english.education[1], degree: 'Lisans, Mekatronik ve Otomasyon Sistemleri Mühendisliği' },
  ],
  languages: [
    { name: 'Arapça', level: 'Ana dil' },
    { name: 'Türkçe', level: 'Ana dil' },
    { name: 'İngilizce', level: 'Akıcı' },
    { name: 'Almanca', level: 'Başlangıç' },
  ],
};

const sites = { en: english, de: german, ar: arabic, tr: turkish };

export function getSiteCopy(locale) {
  return sites[normalizeLocale(locale)];
}

export const ui = {
  en: {
    home: 'Home', projects: 'Projects', downloadCv: 'Download CV', selectedWork: 'Selected work',
    allProjects: 'All projects', about: 'About', experience: 'Experience', toolkit: 'Toolkit',
    publications: 'Publications', education: 'Education', languages: 'Languages', total: 'total',
    nothing: 'Nothing here yet.', back: 'All projects', live: 'Live site', source: 'Source',
    status: 'Status', role: 'Role', partners: 'Partners', programme: 'Programme', deployed: 'Deployed',
    language: 'Language', englishDetail: 'The full case study is currently available in English.',
  },
  de: {
    home: 'Start', projects: 'Projekte', downloadCv: 'Lebenslauf', selectedWork: 'Ausgewählte Projekte',
    allProjects: 'Alle Projekte', about: 'Profil', experience: 'Erfahrung', toolkit: 'Kompetenzen',
    publications: 'Publikationen', education: 'Ausbildung', languages: 'Sprachen', total: 'gesamt',
    nothing: 'Noch keine Projekte.', back: 'Alle Projekte', live: 'Live ansehen', source: 'Quellcode',
    status: 'Status', role: 'Rolle', partners: 'Partner', programme: 'Programm', deployed: 'Einsatzorte',
    language: 'Sprache', englishDetail: 'Die vollständige Fallstudie ist derzeit auf Englisch verfügbar.',
  },
  ar: {
    home: 'الرئيسية', projects: 'المشاريع', downloadCv: 'السيرة الذاتية', selectedWork: 'أعمال مختارة',
    allProjects: 'كل المشاريع', about: 'نبذة', experience: 'الخبرة', toolkit: 'الخبرات التقنية',
    publications: 'الأبحاث', education: 'التعليم', languages: 'اللغات', total: 'المجموع',
    nothing: 'لا توجد مشاريع بعد.', back: 'كل المشاريع', live: 'عرض مباشر', source: 'المصدر',
    status: 'الحالة', role: 'الدور', partners: 'الشركاء', programme: 'البرنامج', deployed: 'مواقع التشغيل',
    language: 'اللغة', englishDetail: 'دراسة الحالة الكاملة متاحة حالياً باللغة الإنجليزية.',
  },
  tr: {
    home: 'Ana sayfa', projects: 'Projeler', downloadCv: 'Özgeçmiş', selectedWork: 'Seçili çalışmalar',
    allProjects: 'Tüm projeler', about: 'Hakkımda', experience: 'Deneyim', toolkit: 'Yetkinlikler',
    publications: 'Yayınlar', education: 'Eğitim', languages: 'Diller', total: 'toplam',
    nothing: 'Henüz proje yok.', back: 'Tüm projeler', live: 'Canlı site', source: 'Kaynak',
    status: 'Durum', role: 'Rol', partners: 'Ortaklar', programme: 'Program', deployed: 'Kullanım yerleri',
    language: 'Dil', englishDetail: 'Ayrıntılı vaka çalışması şu anda İngilizce sunulmaktadır.',
  },
};

const projectTranslations = {
  de: {
    'document-intelligence-suite': ['Dokumentenintelligenz-Suite', 'Drei produktive Parser mit über 90 % Feldgenauigkeit; der Dienst spart seit Einführung mehr als 60.000 € an manuellen Bearbeitungskosten.'],
    'comment-moderation-llm': ['Moderation von Verkaufskommentaren', 'Ein intern trainiertes LLM moderiert Kommentare zu Verkaufsangeboten, ohne Kundentexte an externe Dienste zu senden.'],
    'realtime-tts-cluster-meet': ['Echtzeit-Sprachausgabe für cluster-meet', 'Forschung an einer Text-to-Speech-Lösung mit ausreichend niedriger Latenz für Live-Besprechungen.'],
    'noise-suppression-cluster-meet': ['Rauschunterdrückung für cluster-meet', 'Forschung zur Entfernung von Hintergrundgeräuschen aus Live-Audio, ohne die Sprache zu beschädigen.'],
    'sales-lead-proposal-system': ['System für Lead-Bewertung und Angebote', 'Ein System, das Kaufabsicht über semantische Ähnlichkeit bewertet und daraus nachvollziehbare Angebote erstellt.'],
    'enterprise-knowledge-graph': ['Unternehmensweiter Knowledge Graph', 'Agentische Pipelines überführen verteilte Daten europäischer Unternehmen in einen abfragbaren Wissensgraphen.'],
    'tunnel-incident-detection': ['Störfallerkennung für Tunnel und Autobahnen', 'Echtzeit-Vision für türkische Straßen und Tunnel, direkt auf Edge-Hardware ausgeführt.'],
    'rail-crossing-detection': ['Gefahrenerkennung an Bahnübergängen', 'Objekterkennung an serbischen Bahnübergängen meldet Risiken, solange noch Zeit zum Eingreifen bleibt.'],
    'port-container-scanner': ['3D-Containerscanner für Häfen', 'Maschinelles Lernen auf 3D-Scans von Containern erhöhte den Durchsatz und reduzierte Fehlablesungen.'],
    'variable-message-signs': ['Dynamische Verkehrsschilder', 'Entwicklung und Einführung von Systemen zur Verkehrsführung in mehreren türkischen Städten.'],
  },
  ar: {
    'document-intelligence-suite': ['منظومة فهم المستندات', 'ثلاثة محللات قيد الإنتاج بدقة تتجاوز 90٪؛ وفرت الخدمة منذ إطلاقها أكثر من 60 ألف يورو من تكاليف المعالجة اليدوية.'],
    'comment-moderation-llm': ['مراجعة تعليقات المبيعات', 'نموذج لغوي مدرّب محلياً يراجع تعليقات الإعلانات مع بقاء نصوص العملاء داخل المؤسسة.'],
    'realtime-tts-cluster-meet': ['تحويل النص إلى كلام لحظياً في cluster-meet', 'بحث وتطوير لمنظومة نطق منخفضة التأخير تعمل داخل الاجتماعات المباشرة.'],
    'noise-suppression-cluster-meet': ['إزالة الضوضاء في cluster-meet', 'بحث وتطوير لإزالة ضوضاء الخلفية من صوت الاجتماعات دون الإضرار بالكلام.'],
    'sales-lead-proposal-system': ['نظام تقييم العملاء المحتملين والعروض', 'نظام يقدّر نية الشراء بالتشابه الدلالي ويولّد عروضاً قابلة للتفسير.'],
    'enterprise-knowledge-graph': ['رسم المعرفة المؤسسي', 'مسارات وكلاء تحوّل بيانات الشركات الأوروبية المتفرقة إلى رسم معرفة قابل للاستعلام.'],
    'tunnel-incident-detection': ['كشف حوادث الأنفاق والطرق السريعة', 'رؤية حاسوبية لحظية للطرق والأنفاق التركية تعمل على أجهزة طرفية قرب الموقع.'],
    'rail-crossing-detection': ['كشف مخاطر معابر السكك الحديدية', 'كشف الأجسام في معابر صربيا لتنبيه المشغلين قبل فوات وقت التدخل.'],
    'port-container-scanner': ['ماسح حاويات ثلاثي الأبعاد للموانئ', 'تعلم آلي على مسوح ثلاثية الأبعاد رفع الإنتاجية وخفّض أخطاء القراءة.'],
    'variable-message-signs': ['أنظمة لوحات الرسائل المرورية', 'تصميم وتطوير وتشغيل لوحات توجيه مروري في عدة مدن تركية.'],
  },
  tr: {
    'document-intelligence-suite': ['Belge Zekâsı Paketi', 'Alan bazında %90’ın üzerinde doğruluğa sahip üç üretim aracı; hizmet devreye alındığından beri manuel işlem maliyetlerinde €60K+ tasarruf sağladı.'],
    'comment-moderation-llm': ['Satış Yorumu Moderasyonu', 'Müşteri metinlerini kurum dışına çıkarmadan satış ilanı yorumlarını denetleyen yerel eğitimli LLM.'],
    'realtime-tts-cluster-meet': ['cluster-meet için Gerçek Zamanlı TTS', 'Canlı toplantı içinde konuşabilecek kadar düşük gecikmeli metinden sese sistemi üzerine Ar-Ge.'],
    'noise-suppression-cluster-meet': ['cluster-meet için Gürültü Bastırma', 'Konuşmayı bozmadan canlı toplantı sesindeki arka plan gürültüsünü giderme üzerine Ar-Ge.'],
    'sales-lead-proposal-system': ['Satış Adayı ve Teklif Sistemi', 'Satın alma niyetini anlamsal benzerlikle değerlendiren ve açıklanabilir teklifler üreten sistem.'],
    'enterprise-knowledge-graph': ['Kurumsal Bilgi Grafiği', 'Dağınık Avrupa şirket verilerini sorgulanabilir bilgi grafiğine dönüştüren ajan tabanlı hatlar.'],
    'tunnel-incident-detection': ['Tünel ve Otoyol Olay Tespiti', 'Türkiye’de yol ve tüneller için saha donanımında çalışan gerçek zamanlı bilgisayarlı görü.'],
    'rail-crossing-detection': ['Demiryolu Geçidi Olay Tespiti', 'Sırbistan’daki geçitlerde müdahale süresi varken tehlikeleri bildiren nesne tespiti.'],
    'port-container-scanner': ['3B Liman Konteyner Tarayıcısı', 'Konteynerlerin 3B taramalarında işlem kapasitesini artırıp hatalı okumaları azaltan makine öğrenmesi.'],
    'variable-message-signs': ['Değişken Mesaj İşaret Sistemleri', 'Birçok Türk şehrinde tasarlanan, geliştirilen ve devreye alınan trafik yönlendirme sistemleri.'],
  },
};

export function getProjectCopy(locale, id, original) {
  const normalized = normalizeLocale(locale);
  const translated = projectTranslations[normalized]?.[id];
  return translated ? { ...original, title: translated[0], summary: translated[1] } : original;
}
