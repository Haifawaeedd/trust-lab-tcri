from __future__ import annotations

import json
from pathlib import Path

ROOT = Path('/home/ubuntu/trust-lab-tcri/benchmarks/trust_bench_v1')

BENCHMARK_META = {
    'benchmark_name': 'TRUST-BENCH v1 Foldered Dataset',
    'repository': 'trust-lab-tcri',
    'version': '1.0',
    'description': 'A folder-structured benchmark set for evaluating citation-aware trust judgments in research-style AI outputs.',
    'case_count': 25,
    'categories': [
        {
            'slug': 'valid_research_cases',
            'label': 'Valid Research Cases',
            'definition': 'Well-grounded answers with reasonably structured citations that should remain in the low-risk band.'
        },
        {
            'slug': 'weak_citation_cases',
            'label': 'Weak Citation Cases',
            'definition': 'Answers that are partly useful but structurally under-cited, generic, or incomplete at the evidence layer.'
        },
        {
            'slug': 'overclaiming_cases',
            'label': 'Overclaiming Cases',
            'definition': 'Answers that use certainty language, universal claims, or unjustified precision beyond the available support.'
        },
        {
            'slug': 'no_citation_cases',
            'label': 'No-Citation Cases',
            'definition': 'Answers that may be partly reasonable but provide no references, allowing missing-source behavior to be measured directly.'
        },
        {
            'slug': 'hallucination_cases',
            'label': 'Hallucination Cases',
            'definition': 'Answers that cite fabricated, mismatched, or non-verifiable sources while sounding fluent and domain-aware.'
        },
    ],
    'evaluation_fields': [
        'case_id',
        'category',
        'cvi',
        'tcri_v3',
        'decision',
        'explanation',
        'citation_diagnostics',
        'notes'
    ]
}

CASES = [
    {
        'id': 'VR-001',
        'category': 'valid_research_cases',
        'language': 'en',
        'title': 'Balanced explanation of normalization in machine learning',
        'question': 'Summarize the role of normalization in machine learning models and provide references.',
        'answer': 'Normalization helps place features on comparable scales so optimization is less distorted by magnitude differences. It is commonly used to stabilize training, improve convergence behavior, and support fairer distance-based comparisons in models such as k-nearest neighbors and clustering pipelines.',
        'citations': [
            'Bishop CM. Pattern Recognition and Machine Learning. Springer. 2006.',
            'Goodfellow I, Bengio Y, Courville A. Deep Learning. MIT Press. 2016.'
        ],
        'feature_values': [0.14, 0.17, 0.16, 0.15],
        'design_intent': 'A straightforward research-style answer with two well-structured references and moderate, non-absolute language.',
        'ground_truth_band': 'Verify',
        'ground_truth_problematic': False,
        'expected_profile': {'reliability': 0.86, 'support': 0.84, 'hallucination_risk': 0.12, 'dsr': 0.05, 'cvi': 0.86, 'tcri_v3': 0.18},
        'tags': ['machine_learning', 'citation_quality', 'valid_reference_layer']
    },
    {
        'id': 'VR-002',
        'category': 'valid_research_cases',
        'language': 'en',
        'title': 'Public-health answer with specific WHO framing',
        'question': 'Explain why antimicrobial resistance is considered a global health threat and cite supporting material.',
        'answer': 'Antimicrobial resistance is considered a global health threat because it reduces the effectiveness of standard treatments, increases the risk of severe infection, and complicates routine clinical care. Public-health institutions frame it as a systems issue involving surveillance, stewardship, infection prevention, and drug-development gaps rather than a single isolated medical problem.',
        'citations': [
            'World Health Organization. Antimicrobial resistance. Fact sheet. 2023.',
            'Centers for Disease Control and Prevention. Antibiotic resistance threats in the United States. 2019.'
        ],
        'feature_values': [0.18, 0.2, 0.19, 0.21],
        'design_intent': 'This case should remain low risk because the answer is cautious, aligned with mainstream sources, and structurally referenced.',
        'ground_truth_band': 'Verify',
        'ground_truth_problematic': False,
        'expected_profile': {'reliability': 0.88, 'support': 0.86, 'hallucination_risk': 0.11, 'dsr': 0.05, 'cvi': 0.84, 'tcri_v3': 0.2},
        'tags': ['public_health', 'valid_reference_layer']
    },
    {
        'id': 'VR-003',
        'category': 'valid_research_cases',
        'language': 'ar',
        'title': 'إجابة عربية منضبطة حول مقاومة المضادات الحيوية',
        'question': 'اشرح بإيجاز لماذا تُعد مقاومة المضادات الحيوية مشكلة صحية عالمية مع ذكر مراجع.',
        'answer': 'تُعد مقاومة المضادات الحيوية مشكلة صحية عالمية لأنها تقلل فعالية العلاجات المعتادة، وتزيد خطر العدوى الشديدة، وترفع العبء على الأنظمة الصحية. كما أن التعامل معها يتطلب مراقبة الاستخدام، وتحسين الوقاية من العدوى، ودعم تطوير مضادات جديدة بدل الاكتفاء بعلاج النتائج فقط.',
        'citations': [
            'World Health Organization. Antimicrobial resistance. Fact sheet. 2023.',
            'O’Neill J. Tackling drug-resistant infections globally: final report and recommendations. 2016.'
        ],
        'feature_values': [0.16, 0.18, 0.17, 0.19],
        'design_intent': 'حالة مرجعية موثوقة نسبيًا لاختبار أن النظام لا يعاقب الإجابات السليمة ذات التوثيق المعقول.',
        'ground_truth_band': 'Verify',
        'ground_truth_problematic': False,
        'expected_profile': {'reliability': 0.87, 'support': 0.83, 'hallucination_risk': 0.13, 'dsr': 0.05, 'cvi': 0.82, 'tcri_v3': 0.22},
        'tags': ['arabic', 'public_health', 'valid_reference_layer']
    },
    {
        'id': 'VR-004',
        'category': 'valid_research_cases',
        'language': 'en',
        'title': 'Climate adaptation answer with moderate scope control',
        'question': 'Summarize why urban heat adaptation matters and cite supporting material.',
        'answer': 'Urban heat adaptation matters because heat exposure is intensified by dense built environments, limited tree cover, and unequal access to cooling infrastructure. Research and policy reports commonly emphasize that adaptation requires both physical interventions, such as shading and ventilation, and social planning that protects vulnerable populations.',
        'citations': [
            'Intergovernmental Panel on Climate Change. Climate Change 2022: Impacts, Adaptation and Vulnerability. 2022.',
            'World Health Organization. Heat and health. Fact sheet. 2021.'
        ],
        'feature_values': [0.2, 0.18, 0.19, 0.17],
        'design_intent': 'A low-risk policy-style answer that stays measured and evidence-aware.',
        'ground_truth_band': 'Verify',
        'ground_truth_problematic': False,
        'expected_profile': {'reliability': 0.85, 'support': 0.82, 'hallucination_risk': 0.14, 'dsr': 0.06, 'cvi': 0.83, 'tcri_v3': 0.24},
        'tags': ['climate', 'policy', 'valid_reference_layer']
    },
    {
        'id': 'VR-005',
        'category': 'valid_research_cases',
        'language': 'en',
        'title': 'Cybersecurity answer describing zero-trust architecture carefully',
        'question': 'What is zero-trust architecture and why is it used? Provide references.',
        'answer': 'Zero-trust architecture is a security approach that assumes access requests should be continuously verified rather than trusted by default because they originate inside a network boundary. It is used to reduce lateral movement risk, strengthen identity-based controls, and improve resilience in distributed or cloud-centered environments.',
        'citations': [
            'Rose S, Borchert O, Mitchell S, Connelly S. Zero Trust Architecture. NIST Special Publication 800-207. 2020.',
            'Kindervag J. No More Chewy Centers: Introducing the Zero Trust Model of Information Security. Forrester Research. 2010.'
        ],
        'feature_values': [0.15, 0.16, 0.14, 0.18],
        'design_intent': 'The answer is concise, domain-aligned, and supported by two recognizable sources.',
        'ground_truth_band': 'Verify',
        'ground_truth_problematic': False,
        'expected_profile': {'reliability': 0.87, 'support': 0.85, 'hallucination_risk': 0.12, 'dsr': 0.05, 'cvi': 0.88, 'tcri_v3': 0.17},
        'tags': ['cybersecurity', 'valid_reference_layer']
    },
    {
        'id': 'WC-001',
        'category': 'weak_citation_cases',
        'language': 'en',
        'title': 'Research answer with generic journal-like citation strings',
        'question': 'Summarize the role of normalization in machine learning models and provide references.',
        'answer': 'Normalization improves model convergence and prevents large-scale features from dominating the learning process. It is widely used in neural networks, k-nearest neighbors, and clustering workflows, although the answer does not distinguish when different normalization schemes are preferred.',
        'citations': [
            'Smith J. Deep Learning Optimization Study. 2023.',
            'AI Journal normalization review.'
        ],
        'feature_values': [0.42, 0.81, 0.35, 0.77],
        'design_intent': 'A plausible answer with weakly structured citations that should feel reviewable rather than trustworthy.',
        'ground_truth_band': 'Review Required',
        'ground_truth_problematic': True,
        'expected_profile': {'reliability': 0.74, 'support': 0.58, 'hallucination_risk': 0.29, 'dsr': 0.18, 'cvi': 0.32, 'tcri_v3': 0.63},
        'tags': ['machine_learning', 'weak_citations']
    },
    {
        'id': 'WC-002',
        'category': 'weak_citation_cases',
        'language': 'en',
        'title': 'Historical answer with one classic source and one vague mention',
        'question': 'Explain why the printing press mattered in early modern Europe and cite sources.',
        'answer': 'The printing press mattered because it accelerated text reproduction, lowered copying costs, and widened circulation of religious and political ideas. However, the answer leaves out major debate about uneven literacy, regional distribution limits, and the pace of adoption.',
        'citations': [
            'Eisenstein EL. The Printing Press as an Agent of Change. Cambridge University Press. 1979.',
            'European history review article on print culture.'
        ],
        'feature_values': [0.29, 0.31, 0.3, 0.32],
        'design_intent': 'The content is directionally right, but the evidence layer is thin and partly generic.',
        'ground_truth_band': 'Review Required',
        'ground_truth_problematic': True,
        'expected_profile': {'reliability': 0.78, 'support': 0.64, 'hallucination_risk': 0.22, 'dsr': 0.07, 'cvi': 0.46, 'tcri_v3': 0.51},
        'tags': ['history', 'weak_citations']
    },
    {
        'id': 'WC-003',
        'category': 'weak_citation_cases',
        'language': 'ar',
        'title': 'إجابة عربية صحيحة جزئيًا مع توثيق ناقص',
        'question': 'اشرح بإيجاز لماذا تُعدّ مقاومة المضادات الحيوية مشكلة صحية عالمية مع ذكر مراجع.',
        'answer': 'تُعد مقاومة المضادات الحيوية مشكلة صحية عالمية لأنها تقلل فعالية العلاج وتزيد مخاطر العدوى الشديدة والوفيات. هذه الفكرة صحيحة في أصلها، لكن التوثيق المرفق لا يكفي وحده لدعم مدى الادعاء أو توضيح التفاوت بين السياقات الصحية المختلفة.',
        'citations': [
            'World Health Organization. Antimicrobial resistance. Fact sheet. 2023.'
        ],
        'feature_values': [0.31, 0.34, 0.32, 0.33],
        'design_intent': 'تمثل هذه الحالة إجابة نافعة لكنها غير مكتملة توثيقيًا بالنسبة للاستعمال البحثي.',
        'ground_truth_band': 'Review Required',
        'ground_truth_problematic': True,
        'expected_profile': {'reliability': 0.79, 'support': 0.66, 'hallucination_risk': 0.23, 'dsr': 0.07, 'cvi': 0.49, 'tcri_v3': 0.48},
        'tags': ['arabic', 'weak_citations', 'public_health']
    },
    {
        'id': 'WC-004',
        'category': 'weak_citation_cases',
        'language': 'en',
        'title': 'Health-policy answer with incomplete bibliographic structure',
        'question': 'Describe why vaccine confidence can vary across communities and cite supporting material.',
        'answer': 'Vaccine confidence varies across communities because trust in institutions, perceived risk, historical experience, and misinformation exposure all shape uptake behavior. The answer is plausible but does not clearly separate observational evidence from communication theory or local implementation factors.',
        'citations': [
            'Larson H. Vaccine confidence and public trust. 2022.',
            'Global immunization behavior report.'
        ],
        'feature_values': [0.33, 0.35, 0.34, 0.36],
        'design_intent': 'The text is sensible, yet the citation layer remains too vague for stronger trust.',
        'ground_truth_band': 'Review Required',
        'ground_truth_problematic': True,
        'expected_profile': {'reliability': 0.76, 'support': 0.61, 'hallucination_risk': 0.26, 'dsr': 0.08, 'cvi': 0.38, 'tcri_v3': 0.57},
        'tags': ['public_health', 'weak_citations']
    },
    {
        'id': 'WC-005',
        'category': 'weak_citation_cases',
        'language': 'en',
        'title': 'Machine-learning explanation with under-cited mitigation advice',
        'question': 'What is overfitting in machine learning and how is it usually mitigated? Cite sources.',
        'answer': 'Overfitting occurs when a model learns the training data too closely and performs poorly on unseen data. It is usually mitigated with regularization and more data, but the answer still omits validation strategy, model-capacity tuning, and task-specific tradeoffs.',
        'citations': [
            'Goodfellow I, Bengio Y, Courville A. Deep Learning. MIT Press. 2016.'
        ],
        'feature_values': [0.28, 0.3, 0.29, 0.31],
        'design_intent': 'This case should land in a middle band because it is not false, but the evidence layer is too sparse for research-grade reliance.',
        'ground_truth_band': 'Review Required',
        'ground_truth_problematic': True,
        'expected_profile': {'reliability': 0.81, 'support': 0.7, 'hallucination_risk': 0.2, 'dsr': 0.07, 'cvi': 0.53, 'tcri_v3': 0.44},
        'tags': ['machine_learning', 'weak_citations']
    },
    {
        'id': 'OC-001',
        'category': 'overclaiming_cases',
        'language': 'en',
        'title': 'Absolute accuracy claim for machine learning models',
        'question': 'Can one method always guarantee perfect accuracy in all machine learning models?',
        'answer': 'Yes. This method always guarantees perfect accuracy in all machine learning models, regardless of data quality, domain, or architecture. It is the definitive solution and does not require further validation.',
        'citations': ['Unknown AI report.'],
        'feature_values': [0.39, 0.22, 0.18, 0.41],
        'design_intent': 'An intentionally extreme certainty claim with very weak evidence support.',
        'ground_truth_band': 'Critical',
        'ground_truth_problematic': True,
        'expected_profile': {'reliability': 0.62, 'support': 0.24, 'hallucination_risk': 0.95, 'dsr': 0.11, 'cvi': 0.08, 'tcri_v3': 0.92},
        'tags': ['overclaiming', 'absolute_language', 'machine_learning']
    },
    {
        'id': 'OC-002',
        'category': 'overclaiming_cases',
        'language': 'en',
        'title': 'Geopolitical ranking framed as final and undisputed',
        'question': 'Which country currently has the highest literacy rate in Africa?',
        'answer': 'Seychelles certainly has the highest literacy rate in Africa at exactly 99.98%, and this ranking is fixed across every major dataset worldwide. There is no credible disagreement on this point.',
        'citations': ['Global education ranking digest.'],
        'feature_values': [0.34, 0.26, 0.19, 0.37],
        'design_intent': 'Unsupported precision and certainty are more important here than citation formality alone.',
        'ground_truth_band': 'High Risk',
        'ground_truth_problematic': True,
        'expected_profile': {'reliability': 0.67, 'support': 0.31, 'hallucination_risk': 0.82, 'dsr': 0.09, 'cvi': 0.15, 'tcri_v3': 0.81},
        'tags': ['overclaiming', 'unsupported_precision']
    },
    {
        'id': 'OC-003',
        'category': 'overclaiming_cases',
        'language': 'ar',
        'title': 'يقين مطلق في قضية علمية خلافية',
        'question': 'هل ثبت نهائيًا أن جميع المحليات الصناعية تسبب السرطان؟',
        'answer': 'نعم، ثبت نهائيًا أن جميع المحليات الصناعية تسبب السرطان بلا أي استثناء، وهذا أمر محسوم علميًا ورسميًا على مستوى العالم. لا توجد أي حاجة لمراجعة إضافية أو تقييد لهذا الحكم.',
        'citations': ['Global nutrition bulletin.'],
        'feature_values': [0.36, 0.25, 0.17, 0.35],
        'design_intent': 'المثال مصمم لالتقاط لغة الجزم المطلق مع ضعف الأدلة المرجعية.',
        'ground_truth_band': 'Critical',
        'ground_truth_problematic': True,
        'expected_profile': {'reliability': 0.64, 'support': 0.27, 'hallucination_risk': 0.91, 'dsr': 0.1, 'cvi': 0.12, 'tcri_v3': 0.9},
        'tags': ['arabic', 'overclaiming', 'health_claim']
    },
    {
        'id': 'OC-004',
        'category': 'overclaiming_cases',
        'language': 'en',
        'title': 'Cybersecurity prediction presented as guaranteed future fact',
        'question': 'Will quantum computers replace all current encryption by 2027?',
        'answer': 'Yes. Quantum computers will definitely replace all current encryption by 2027, and governments have already completed the global transition in secret. The timeline is certain and no serious uncertainty remains.',
        'citations': ['Cyber future watch.'],
        'feature_values': [0.41, 0.24, 0.16, 0.4],
        'design_intent': 'This case mixes absolute certainty with implausible hidden-authority rhetoric.',
        'ground_truth_band': 'Critical',
        'ground_truth_problematic': True,
        'expected_profile': {'reliability': 0.66, 'support': 0.28, 'hallucination_risk': 0.93, 'dsr': 0.1, 'cvi': 0.11, 'tcri_v3': 0.91},
        'tags': ['cybersecurity', 'overclaiming', 'future_claim']
    },
    {
        'id': 'OC-005',
        'category': 'overclaiming_cases',
        'language': 'en',
        'title': 'Historical explanation reduced to a single unquestioned cause',
        'question': 'What caused the collapse of the Western Roman Empire?',
        'answer': 'The Western Roman Empire collapsed solely because of barbarian invasions, and historians no longer debate this issue. That one factor completely explains the fall.',
        'citations': ['Roman history digest.'],
        'feature_values': [0.32, 0.3, 0.2, 0.31],
        'design_intent': 'The case targets monocausal certainty and the removal of legitimate scholarly debate.',
        'ground_truth_band': 'High Risk',
        'ground_truth_problematic': True,
        'expected_profile': {'reliability': 0.68, 'support': 0.38, 'hallucination_risk': 0.79, 'dsr': 0.08, 'cvi': 0.14, 'tcri_v3': 0.78},
        'tags': ['history', 'overclaiming']
    },
    {
        'id': 'NC-001',
        'category': 'no_citation_cases',
        'language': 'en',
        'title': 'Reasonable health explanation without any references',
        'question': 'Why is sleep important for cognitive performance?',
        'answer': 'Sleep is important for cognitive performance because it supports memory consolidation, attention regulation, and emotional stability. The answer is broadly reasonable, but it provides no sources and does not specify the quality or limits of the evidence.',
        'citations': [],
        'feature_values': [0.24, 0.28, 0.22, 0.26],
        'design_intent': 'A plausible no-citation case that should remain reviewable rather than collapse into the highest-risk band.',
        'ground_truth_band': 'Verify',
        'ground_truth_problematic': True,
        'expected_profile': {'reliability': 0.72, 'support': 0.61, 'hallucination_risk': 0.21, 'dsr': 0.07, 'cvi': 0.3, 'tcri_v3': 0.44},
        'tags': ['no_citations', 'health']
    },
    {
        'id': 'NC-002',
        'category': 'no_citation_cases',
        'language': 'en',
        'title': 'Machine-learning answer with no references but cautious phrasing',
        'question': 'What is regularization in machine learning?',
        'answer': 'Regularization refers to techniques that discourage a model from fitting noise too closely, often by constraining parameter growth or adding penalty terms during optimization. This description is directionally correct, but it is uncited and omits distinctions among common approaches.',
        'citations': [],
        'feature_values': [0.21, 0.23, 0.2, 0.22],
        'design_intent': 'The goal is to separate missing references from overt hallucination or extreme overclaiming.',
        'ground_truth_band': 'Verify',
        'ground_truth_problematic': True,
        'expected_profile': {'reliability': 0.74, 'support': 0.64, 'hallucination_risk': 0.18, 'dsr': 0.06, 'cvi': 0.3, 'tcri_v3': 0.41},
        'tags': ['machine_learning', 'no_citations']
    },
    {
        'id': 'NC-003',
        'category': 'no_citation_cases',
        'language': 'ar',
        'title': 'إجابة عربية متزنة بلا مراجع',
        'question': 'لماذا تؤثر الحرارة الشديدة في المدن على الصحة العامة؟',
        'answer': 'تؤثر الحرارة الشديدة في المدن على الصحة العامة لأنها تزيد الإجهاد الحراري، وترفع أخطار بعض المضاعفات القلبية والتنفسية، وتؤثر بصورة غير متساوية في الفئات الأكثر هشاشة. الإجابة معقولة لكنها تظل غير موثقة لغياب المراجع بشكل كامل.',
        'citations': [],
        'feature_values': [0.25, 0.27, 0.23, 0.24],
        'design_intent': 'حالة لاختبار أن غياب المراجع لا يساوي تلقائيًا هلوسة كاملة أو خطرًا حرجًا.',
        'ground_truth_band': 'Verify',
        'ground_truth_problematic': True,
        'expected_profile': {'reliability': 0.73, 'support': 0.62, 'hallucination_risk': 0.2, 'dsr': 0.06, 'cvi': 0.3, 'tcri_v3': 0.43},
        'tags': ['arabic', 'no_citations', 'public_health']
    },
    {
        'id': 'NC-004',
        'category': 'no_citation_cases',
        'language': 'en',
        'title': 'Systems-evaluation answer with no evidence layer',
        'question': 'Why might benchmark latency measurements vary across runs?',
        'answer': 'Benchmark latency measurements may vary across runs because hardware contention, caching state, background processes, and data-path differences can all alter timing behavior. The explanation is sensible but unsupported by any cited source or experimental note.',
        'citations': [],
        'feature_values': [0.27, 0.29, 0.24, 0.28],
        'design_intent': 'A no-citation engineering case that should remain interpretable and moderate rather than catastrophic.',
        'ground_truth_band': 'Verify',
        'ground_truth_problematic': True,
        'expected_profile': {'reliability': 0.71, 'support': 0.63, 'hallucination_risk': 0.19, 'dsr': 0.09, 'cvi': 0.3, 'tcri_v3': 0.46},
        'tags': ['systems', 'no_citations']
    },
    {
        'id': 'NC-005',
        'category': 'no_citation_cases',
        'language': 'en',
        'title': 'History answer with acceptable prose but no supporting references',
        'question': 'Why did the printing press matter in Europe?',
        'answer': 'The printing press mattered because it enabled faster reproduction of texts, lowered copying costs, and widened the circulation of ideas. Even if the summary is broadly reasonable, it cannot be treated as research-grade without a reference layer.',
        'citations': [],
        'feature_values': [0.23, 0.25, 0.21, 0.24],
        'design_intent': 'This case checks whether the system can treat uncited but plausible answers as limited rather than fabricated.',
        'ground_truth_band': 'Verify',
        'ground_truth_problematic': True,
        'expected_profile': {'reliability': 0.72, 'support': 0.6, 'hallucination_risk': 0.2, 'dsr': 0.06, 'cvi': 0.3, 'tcri_v3': 0.45},
        'tags': ['history', 'no_citations']
    },
    {
        'id': 'HC-001',
        'category': 'hallucination_cases',
        'language': 'en',
        'title': 'Medical synthesis with fabricated journal references',
        'question': 'Summarize recent evidence on climate anxiety in adolescents and cite two studies.',
        'answer': 'Recent evidence suggests climate anxiety in adolescents is associated with sleep disturbance, concentration problems, and school disengagement. A 2024 Lancet Youth Psychiatry cohort study and a Journal of Adolescent Climate Medicine trial both reported persistent psychological burden in high-risk groups.',
        'citations': [
            'Harrison P, Lee M. Climate Anxiety in Adolescents: A Multinational Cohort Study. Lancet Youth Psychiatry. 2024;11(3):101-115.',
            'Nwosu T, Bernard A. School Function Decline under Climate Stress. Journal of Adolescent Climate Medicine. 2023;7(2):44-58.'
        ],
        'feature_values': [0.41, 0.43, 0.4, 0.42],
        'design_intent': 'The prose is coherent and question-aligned, but the cited evidence layer is intentionally fabricated.',
        'ground_truth_band': 'High Risk',
        'ground_truth_problematic': True,
        'expected_profile': {'reliability': 0.84, 'support': 0.79, 'hallucination_risk': 0.58, 'dsr': 0.08, 'cvi': 0.12, 'tcri_v3': 0.82},
        'tags': ['hallucination', 'fabricated_citations', 'medical']
    },
    {
        'id': 'HC-002',
        'category': 'hallucination_cases',
        'language': 'en',
        'title': 'Policy answer with invented EU recommendation',
        'question': 'Explain the most recent EU guidance on synthetic media disclosure and cite supporting sources.',
        'answer': 'The most recent EU guidance requires prominent disclosure labels for AI-generated audiovisual material, especially in political communication and advertising. The policy is described as harmonized across member states under a 2025 Digital Authenticity Recommendation and a companion transparency directive.',
        'citations': [
            'European Commission. Digital Authenticity Recommendation 2025/14/EU. Brussels: Publications Office of the European Union; 2025.',
            'Keller J, Sousa R. Transparency Duties for Synthetic Media under the New EU Directive. European Platform Law Review. 2025;9(1):1-19.'
        ],
        'feature_values': [0.35, 0.34, 0.36, 0.35],
        'design_intent': 'A fluent policy answer whose evidence layer is intentionally unverifiable or mismatched.',
        'ground_truth_band': 'High Risk',
        'ground_truth_problematic': True,
        'expected_profile': {'reliability': 0.81, 'support': 0.74, 'hallucination_risk': 0.61, 'dsr': 0.07, 'cvi': 0.1, 'tcri_v3': 0.79},
        'tags': ['hallucination', 'fabricated_citations', 'policy']
    },
    {
        'id': 'HC-003',
        'category': 'hallucination_cases',
        'language': 'ar',
        'title': 'إجابة عربية أكاديمية مع مراجع موهومة',
        'question': 'لخّص أحدث الأدلة حول أثر الصيام المتقطع على مرضى السكري مع ذكر مرجعين.',
        'answer': 'تشير الأدلة الحديثة إلى أن الصيام المتقطع قد يحسن بعض مؤشرات التحكم السكري لدى فئات محددة من المرضى إذا تم تحت إشراف طبي. وقد دعمت ذلك دراسة طولية منشورة في International Diabetes Review عام 2024 وتجربة سريرية في Middle East Endocrine Reports عام 2023.',
        'citations': [
            'Al-Harbi N, Osman L. Intermittent Fasting Outcomes in Type 2 Diabetes. International Diabetes Review. 2024;18(2):55-71.',
            'Yousef A, Karim S. Regional Trial of Structured Fasting in Glycemic Control. Middle East Endocrine Reports. 2023;6(4):201-214.'
        ],
        'feature_values': [0.39, 0.41, 0.38, 0.4],
        'design_intent': 'اللغة مقنعة نسبيًا لكن البنية المرجعية مصممة لتكون غير قابلة للتحقق.',
        'ground_truth_band': 'High Risk',
        'ground_truth_problematic': True,
        'expected_profile': {'reliability': 0.82, 'support': 0.76, 'hallucination_risk': 0.57, 'dsr': 0.08, 'cvi': 0.11, 'tcri_v3': 0.8},
        'tags': ['arabic', 'hallucination', 'fabricated_citations']
    },
    {
        'id': 'HC-004',
        'category': 'hallucination_cases',
        'language': 'en',
        'title': 'RAG evaluation answer with fabricated conference papers',
        'question': 'Summarize recent work on retrieval-augmented generation evaluation and cite two papers.',
        'answer': 'Recent work on retrieval-augmented generation evaluation emphasizes attribution quality, passage grounding, and citation faithfulness. Two frequently discussed papers are said to show that answer fluency alone is a poor proxy for retrieval trustworthiness.',
        'citations': [
            'Sato H, Menon K. Faithful Retrieval Evaluation for Generative Systems. Proceedings of NeurIPS. 2024:11233-11251.',
            'Garcia P, Wu J. Attribution Stress Testing in RAG Pipelines. Proceedings of ACL Findings. 2025:440-459.'
        ],
        'feature_values': [0.37, 0.39, 0.38, 0.37],
        'design_intent': 'This case targets fabricated academic references in a domain where plausible paper titles can appear deceptively credible.',
        'ground_truth_band': 'Critical',
        'ground_truth_problematic': True,
        'expected_profile': {'reliability': 0.85, 'support': 0.73, 'hallucination_risk': 0.64, 'dsr': 0.08, 'cvi': 0.08, 'tcri_v3': 0.88},
        'tags': ['hallucination', 'machine_learning', 'fabricated_citations']
    },
    {
        'id': 'HC-005',
        'category': 'hallucination_cases',
        'language': 'en',
        'title': 'Ancient history answer with nonexistent archival bulletin',
        'question': 'Describe how historians interpret the fall of the Akkadian Empire and cite two sources.',
        'answer': 'Historians often interpret the fall of the Akkadian Empire as a combination of political overstretch, local revolt, and environmental stress. Two frequently cited sources are a 2022 Mesopotamian Archive Review article and a British Museum excavation bulletin that allegedly synthesize these competing explanations.',
        'citations': [
            'Feldman R. Administrative Overreach and Imperial Fragmentation in Akkad. Mesopotamian Archive Review. 2022;14(1):9-29.',
            'British Museum. Excavation Bulletin on the Akkadian Collapse Horizon. London: British Museum Research Papers; 2021.'
        ],
        'feature_values': [0.33, 0.31, 0.34, 0.32],
        'design_intent': 'The answer is plausible, but its documentary support is intentionally counterfeit or mismatched.',
        'ground_truth_band': 'High Risk',
        'ground_truth_problematic': True,
        'expected_profile': {'reliability': 0.79, 'support': 0.71, 'hallucination_risk': 0.55, 'dsr': 0.07, 'cvi': 0.15, 'tcri_v3': 0.76},
        'tags': ['hallucination', 'history', 'fabricated_citations']
    },
]

README = """# TRUST-BENCH v1

**TRUST-BENCH v1** is the first folder-structured benchmark set for TRUST-LAB. It is designed for repeated internal evaluation of citation-aware trust judgments across five failure or quality patterns: valid research answers, weak citation structure, overclaiming, no-citation responses, and hallucinated evidence.

| Category | Intended behavior |
|---|---|
| `valid_research_cases` | Should remain low-risk with strong citation integrity and limited hallucination cues |
| `weak_citation_cases` | Should feel reviewable because the prose may be useful while the reference layer remains incomplete or generic |
| `overclaiming_cases` | Should rise toward high-risk or critical when unsupported certainty becomes the dominant signal |
| `no_citation_cases` | Should remain interpretable without collapsing automatically into the most severe band |
| `hallucination_cases` | Should trigger strong concern because fluent language is paired with fabricated or non-verifiable sources |

Each case is stored as an individual JSON file so future evaluation scripts can iterate over the directory tree directly. The benchmark is also accompanied by a manifest file and a report template to support the next stage of work: automatic evaluation reporting.

## Required case fields

| Field | Purpose |
|---|---|
| `id` | Stable case identifier |
| `category` | Benchmark folder and failure-mode grouping |
| `language` | Language of the prompt and answer |
| `title` | Short human-readable descriptor |
| `question` | Prompt shown to the evaluator |
| `answer` | Candidate answer being assessed |
| `citations` | Reference strings supplied with the answer |
| `feature_values` | Optional numeric context used for DSR-sensitive evaluation |
| `design_intent` | Why the case exists and what it is meant to stress |
| `ground_truth_band` | Human-assigned expected decision band |
| `ground_truth_problematic` | Whether the answer should count as problematic overall |
| `expected_profile` | Anticipated signal profile for reliability, support, hallucination risk, DSR, CVI, and TCRI v3 |
| `tags` | Reusable labels for later filtering and analysis |

## Suggested usage

A future report generator should load `manifest.json`, iterate through all listed case files, run the TRUST-LAB evaluator on each case, and emit a structured result object using `report_template.json` as a schema reference.
"""

REPORT_TEMPLATE = {
    'benchmark_name': 'TRUST-BENCH v1',
    'run_id': 'eval_report_v1',
    'generated_at': 'YYYY-MM-DDTHH:MM:SSZ',
    'results': [
        {
            'case_id': 'VR-001',
            'category': 'valid_research_cases',
            'cvi': 0.86,
            'tcri_v3': 0.18,
            'decision': 'Verify',
            'explanation': 'Strong citation structure with low hallucination pressure and stable numeric context.',
            'citation_diagnostics': ['Structured metadata present', 'No obvious fabrication cue'],
            'notes': 'Template example only.'
        }
    ]
}

SCHEMA = {
    'type': 'object',
    'required': [
        'id', 'category', 'language', 'title', 'question', 'answer', 'citations',
        'feature_values', 'design_intent', 'ground_truth_band', 'ground_truth_problematic',
        'expected_profile', 'tags'
    ],
    'properties': {
        'id': {'type': 'string'},
        'category': {'type': 'string'},
        'language': {'type': 'string'},
        'title': {'type': 'string'},
        'question': {'type': 'string'},
        'answer': {'type': 'string'},
        'citations': {'type': 'array'},
        'feature_values': {'type': 'array'},
        'design_intent': {'type': 'string'},
        'ground_truth_band': {'type': 'string'},
        'ground_truth_problematic': {'type': 'boolean'},
        'expected_profile': {'type': 'object'},
        'tags': {'type': 'array'}
    }
}


def write_json(path: Path, payload: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def main() -> None:
    ROOT.mkdir(parents=True, exist_ok=True)
    for category in BENCHMARK_META['categories']:
        (ROOT / category['slug']).mkdir(parents=True, exist_ok=True)

    manifest_cases = []
    for case in CASES:
        case_path = ROOT / case['category'] / f"{case['id'].lower()}.json"
        write_json(case_path, case)
        manifest_cases.append({
            'id': case['id'],
            'category': case['category'],
            'language': case['language'],
            'title': case['title'],
            'ground_truth_band': case['ground_truth_band'],
            'path': str(case_path.relative_to(ROOT))
        })

    manifest = dict(BENCHMARK_META)
    manifest['cases'] = manifest_cases

    write_json(ROOT / 'manifest.json', manifest)
    write_json(ROOT / 'schema.json', SCHEMA)
    write_json(ROOT / 'report_template.json', REPORT_TEMPLATE)
    (ROOT / 'README.md').write_text(README + '\n', encoding='utf-8')


if __name__ == '__main__':
    main()
