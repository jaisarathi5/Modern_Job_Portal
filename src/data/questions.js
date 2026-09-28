/**
 * Comprehensive Question Bank for Job-Specific Assessment Engine.
 * Covers: Technical, Quantitative Aptitude, Logical Reasoning, Coding, and Domain-Specific topics.
 */

export const QUESTION_BANK = [
  // ==========================================
  // TECHNICAL: JavaScript & Web Fundamentals
  // ==========================================
  {
    id: 'tech-js-1',
    category: 'technical',
    topic: 'JavaScript',
    difficulty: 'easy',
    question: 'Which method creates a new array by transforming each element of the original array?',
    options: ['forEach()', 'map()', 'filter()', 'reduce()'],
    correctAnswer: 1,
    explanation: 'The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.',
    skills: ['JavaScript', 'Arrays']
  },
  {
    id: 'tech-js-2',
    category: 'technical',
    topic: 'JavaScript',
    difficulty: 'medium',
    question: 'What is the primary difference between "let" and "var" declarations in JavaScript?',
    options: [
      'let has function scope, whereas var has block scope',
      'let has block scope, whereas var has function or global scope',
      'var variables cannot be reassigned once declared',
      'let variables are hoisted to the top and initialized with undefined'
    ],
    correctAnswer: 1,
    explanation: 'let and const declarations are block-scoped ({ ... }), whereas var declarations are function-scoped or globally scoped and do not observe block boundaries.',
    skills: ['JavaScript', 'ES6+']
  },
  {
    id: 'tech-js-3',
    category: 'technical',
    topic: 'JavaScript',
    difficulty: 'hard',
    question: 'In the JavaScript event loop, in what order do microtasks (e.g., Promise callbacks) and macrotasks (e.g., setTimeout) execute relative to the current call stack?',
    options: [
      'Macrotasks always execute before microtasks',
      'All pending microtasks execute immediately after the current script executes and before the next macrotask is processed',
      'Microtasks and macrotasks are processed concurrently on separate worker threads',
      'Microtasks only run when the browser renders a new layout frame'
    ],
    correctAnswer: 1,
    explanation: 'The event loop processes the synchronous call stack, drains all queued microtasks (Promises, queueMicrotask), and only then picks the next macrotask from the task queue.',
    skills: ['JavaScript', 'Asynchronous Programming']
  },
  {
    id: 'tech-react-1',
    category: 'technical',
    topic: 'React',
    difficulty: 'easy',
    question: 'Which built-in React hook is used to manage state inside a functional component?',
    options: ['useEffect', 'useState', 'useRef', 'useContext'],
    correctAnswer: 1,
    explanation: 'useState is the primary React hook for declaring state variables in functional components.',
    skills: ['React', 'React Hooks']
  },
  {
    id: 'tech-react-2',
    category: 'technical',
    topic: 'React',
    difficulty: 'medium',
    question: 'Why should keys provided in a dynamic list of React elements be stable, unique, and predictable?',
    options: [
      'Keys are used by CSS selectors to style list items',
      'React uses keys during reconciliation to identify which items have changed, been added, or been removed',
      'Keys are sent over the network when submitting the list via a POST request',
      'Keys determine the tab order for screen readers'
    ],
    correctAnswer: 1,
    explanation: 'Keys help React identify which items have changed, been added, or removed during virtual DOM diffing and reconciliation, preventing unnecessary DOM re-creations.',
    skills: ['React', 'Virtual DOM']
  },
  {
    id: 'tech-react-3',
    category: 'technical',
    topic: 'React',
    difficulty: 'hard',
    question: 'When optimizing performance in React, which hook is best suited to cache the calculation result between re-renders when inputs have not changed?',
    options: ['useCallback', 'useMemo', 'useReducer', 'useImperativeHandle'],
    correctAnswer: 1,
    explanation: 'useMemo caches the result of an expensive calculation, recalculating it only when its declared dependencies change.',
    skills: ['React', 'Performance Optimization']
  },
  {
    id: 'tech-html-1',
    category: 'technical',
    topic: 'HTML & CSS',
    difficulty: 'easy',
    question: 'Which CSS Flexbox property controls alignment along the main axis?',
    options: ['align-items', 'justify-content', 'align-content', 'flex-direction'],
    correctAnswer: 1,
    explanation: 'justify-content aligns flex items along the main axis (horizontal by default in row layout).',
    skills: ['CSS', 'HTML', 'Responsive Design']
  },
  {
    id: 'tech-html-2',
    category: 'technical',
    topic: 'HTML & CSS',
    difficulty: 'medium',
    question: 'What is the CSS specificity hierarchy from highest to lowest?',
    options: [
      'Inline styles > ID selectors > Class/Attribute/Pseudo-class > Element selectors',
      'ID selectors > Inline styles > Class selectors > Element selectors',
      'Class selectors > ID selectors > Inline styles > Element selectors',
      'Element selectors > Class selectors > ID selectors > Inline styles'
    ],
    correctAnswer: 0,
    explanation: 'Inline styles hold the highest specificity weight (1000), followed by ID selectors (100), Classes/pseudo-classes (10), and Element/pseudo-element selectors (1).',
    skills: ['CSS', 'Web Fundamentals']
  },
  {
    id: 'tech-git-1',
    category: 'technical',
    topic: 'Git',
    difficulty: 'easy',
    question: 'Which Git command creates a new branch and switches to it in one step?',
    options: ['git branch -m <name>', 'git checkout -b <name>', 'git pull -b <name>', 'git merge <name>'],
    correctAnswer: 1,
    explanation: 'git checkout -b <name> (or git switch -c <name>) creates a new branch and immediately checks it out.',
    skills: ['Git', 'Version Control']
  },
  {
    id: 'tech-git-2',
    category: 'technical',
    topic: 'Git',
    difficulty: 'medium',
    question: 'What does "git rebase" do compared to "git merge"?',
    options: [
      'It discards all commit history on the feature branch',
      'It rewrites commit history by moving or applying commits on top of another base tip',
      'It creates an automatic merge commit containing all conflicts',
      'It synchronizes the local repository with remote tags only'
    ],
    correctAnswer: 1,
    explanation: 'Git rebase reapplies commits on top of another base branch tip to maintain a clean linear commit history without an explicit merge commit.',
    skills: ['Git', 'Version Control']
  },

  // ==========================================
  // TECHNICAL: Java & Object-Oriented Design
  // ==========================================
  {
    id: 'tech-java-1',
    category: 'technical',
    topic: 'Java',
    difficulty: 'easy',
    question: 'Which OOP pillar allows a child class to inherit attributes and methods from a parent class in Java?',
    options: ['Polymorphism', 'Inheritance', 'Encapsulation', 'Abstraction'],
    correctAnswer: 1,
    explanation: 'Inheritance enables a class (subclass) to inherit attributes and methods from an existing class (superclass) using the "extends" keyword.',
    skills: ['Java', 'OOP']
  },
  {
    id: 'tech-java-2',
    category: 'technical',
    topic: 'Java',
    difficulty: 'medium',
    question: 'In Java collections, what is the core difference between HashMap and ConcurrentHashMap?',
    options: [
      'HashMap is thread-safe while ConcurrentHashMap is not',
      'ConcurrentHashMap allows null keys, while HashMap does not',
      'ConcurrentHashMap provides thread safety using bucket-level / segment locking without locking the entire map',
      'HashMap is ordered by default, whereas ConcurrentHashMap is unsorted'
    ],
    correctAnswer: 2,
    explanation: 'ConcurrentHashMap provides thread safety by locking specific bins/segments rather than synchronizing the entire map, avoiding significant lock contention.',
    skills: ['Java', 'Collections', 'Concurrency']
  },
  {
    id: 'tech-java-3',
    category: 'technical',
    topic: 'Java',
    difficulty: 'hard',
    question: 'How does the Java Garbage Collector handle circular references between objects in the heap?',
    options: [
      'Circular references cause an immediate OutOfMemoryError',
      'The JVM uses reachability analysis starting from GC Roots; unreferenced cyclic islands are reclaimed',
      'Java requires explicit invocation of System.gc() to break circular cycles',
      'Cyclic references must implement the WeakReference interface or they can never be collected'
    ],
    correctAnswer: 1,
    explanation: 'Modern JVM garbage collectors employ root-reachability analysis starting from GC roots (thread stacks, static variables). If a cyclic cluster is unreachable from any GC root, it is safely collected.',
    skills: ['Java', 'JVM Architecture', 'Memory Management']
  },

  // ==========================================
  // TECHNICAL: Python & Data Engineering
  // ==========================================
  {
    id: 'tech-py-1',
    category: 'technical',
    topic: 'Python',
    difficulty: 'easy',
    question: 'Which built-in Python data structure is mutable, ordered, and allows duplicate elements?',
    options: ['tuple', 'set', 'list', 'frozenset'],
    correctAnswer: 2,
    explanation: 'Python lists are mutable, ordered sequences that allow duplicate items, defined using square brackets [].',
    skills: ['Python', 'Data Structures']
  },
  {
    id: 'tech-py-2',
    category: 'technical',
    topic: 'Python',
    difficulty: 'medium',
    question: 'What is a Python generator and how does it save memory when processing large datasets?',
    options: [
      'It stores all elements in a compressed binary array in RAM',
      'It uses the "yield" keyword to evaluate and produce items on the fly (lazily) rather than loading all items into memory at once',
      'It delegates iteration to a C multi-threaded subprocess',
      'It converts data to a NumPy contiguous matrix'
    ],
    correctAnswer: 1,
    explanation: 'Generators yield one value at a time on demand through lazy evaluation, retaining state between calls without allocating a full list in memory.',
    skills: ['Python', 'Generators']
  },
  {
    id: 'tech-py-3',
    category: 'technical',
    topic: 'Python',
    difficulty: 'hard',
    question: 'What is the Global Interpreter Lock (GIL) in standard CPython and what is its primary implication?',
    options: [
      'It stops execution if an unhandled exception occurs in any thread',
      'It is a mutex that prevents multiple native threads from executing Python bytecodes concurrently within the same process',
      'It prevents files from being modified during database transactions',
      'It locks all network sockets during SSL handshake'
    ],
    correctAnswer: 1,
    explanation: 'The GIL is a mutex in CPython that ensures only one thread executes Python bytecode at any given moment, making CPU-bound multi-threading bottlenecked unless multiprocessing is used.',
    skills: ['Python', 'Concurrency']
  },

  // ==========================================
  // TECHNICAL: SQL & Database Management
  // ==========================================
  {
    id: 'tech-sql-1',
    category: 'technical',
    topic: 'SQL',
    difficulty: 'easy',
    question: 'Which SQL clause is used to filter records returned by an aggregate query (such as COUNT or SUM)?',
    options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
    correctAnswer: 1,
    explanation: 'The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions.',
    skills: ['SQL', 'DBMS']
  },
  {
    id: 'tech-sql-2',
    category: 'technical',
    topic: 'SQL',
    difficulty: 'medium',
    question: 'What is the difference between a clustered index and a non-clustered index in a relational database?',
    options: [
      'A clustered index stores data alphabetically, while non-clustered indexes store data numerically',
      'A table can have only one clustered index because it physically determines the order of data in the table, whereas multiple non-clustered indexes can exist',
      'Non-clustered indexes are automatically encrypted on disk',
      'Clustered indexes can only be created on foreign keys'
    ],
    correctAnswer: 1,
    explanation: 'A clustered index physically sorts and stores table rows at the leaf level. Therefore, only one clustered index can exist per table.',
    skills: ['SQL', 'Database Optimization', 'Indexing']
  },
  {
    id: 'tech-sql-3',
    category: 'technical',
    topic: 'SQL',
    difficulty: 'hard',
    question: 'Which isolation level prevents Dirty Reads and Non-Repeatable Reads, but may still permit Phantom Reads under the ANSI SQL standard?',
    options: ['Read Uncommitted', 'Read Committed', 'Repeatable Read', 'Serializable'],
    correctAnswer: 2,
    explanation: 'Repeatable Read guarantees that any data read cannot change during the transaction (preventing non-repeatable reads), but newly inserted rows meeting query conditions may appear (phantom reads).',
    skills: ['SQL', 'Transactions', 'ACID']
  },

  // ==========================================
  // TECHNICAL: Machine Learning & AI
  // ==========================================
  {
    id: 'tech-ml-1',
    category: 'technical',
    topic: 'Machine Learning',
    difficulty: 'easy',
    question: 'Which of the following tasks is an example of Unsupervised Learning?',
    options: [
      'Spam email detection (labeled spam vs non-spam)',
      'Customer market segmentation using K-Means clustering',
      'Predicting house price based on square footage',
      'Handwritten digit classification with MNIST labels'
    ],
    correctAnswer: 1,
    explanation: 'K-Means customer clustering groups unlabeled observations based on intrinsic patterns and feature similarities, which is unsupervised learning.',
    skills: ['Machine Learning', 'Data Science']
  },
  {
    id: 'tech-ml-2',
    category: 'technical',
    topic: 'Machine Learning',
    difficulty: 'medium',
    question: 'What does a high training accuracy combined with significantly lower validation accuracy usually indicate in a predictive model?',
    options: [
      'High bias (Underfitting)',
      'High variance (Overfitting)',
      'Proper model convergence',
      'Data leakage in validation split'
    ],
    correctAnswer: 1,
    explanation: 'Overfitting occurs when a model memorizes noise and sample-specific patterns from the training dataset, resulting in poor generalization on unseen validation data.',
    skills: ['Machine Learning', 'Statistics']
  },
  {
    id: 'tech-ml-3',
    category: 'technical',
    topic: 'Machine Learning',
    difficulty: 'hard',
    question: 'In Deep Neural Networks, how does Batch Normalization accelerate training stability?',
    options: [
      'By removing negative weights across all hidden layers',
      'By re-centering and re-scaling mini-batch layer inputs to mitigate internal covariate shift',
      'By replacing backpropagation with genetic algorithm weight tuning',
      'By strictly forcing all activation functions to be linear'
    ],
    correctAnswer: 1,
    explanation: 'Batch Normalization normalizes activations for each mini-batch across feature dimensions, reducing internal covariate shift and allowing higher learning rates.',
    skills: ['Machine Learning', 'Deep Learning']
  },

  // ==========================================
  // QUANTITATIVE APTITUDE: Numbers, Ratios & Percentages
  // ==========================================
  {
    id: 'quant-1',
    category: 'quantitative',
    topic: 'Percentages',
    difficulty: 'easy',
    question: 'An item priced at ₹1,200 is offered at a 25% discount. What is the final sale price?',
    options: ['₹850', '₹900', '₹950', '₹1,000'],
    correctAnswer: 1,
    explanation: 'Discount = 25% of 1200 = (25/100) * 1200 = ₹300. Sale price = 1200 - 300 = ₹900.',
    skills: ['Quantitative Aptitude', 'Percentages']
  },
  {
    id: 'quant-2',
    category: 'quantitative',
    topic: 'Profit and Loss',
    difficulty: 'medium',
    question: 'A merchant sells a laptop for ₹48,000, making a profit of 20%. What was the original cost price?',
    options: ['₹38,400', '₹40,000', '₹42,000', '₹44,000'],
    correctAnswer: 1,
    explanation: 'Selling Price = Cost Price * (1 + 0.20) => 48,000 = CP * 1.2 => CP = 48,000 / 1.2 = ₹40,000.',
    skills: ['Quantitative Aptitude', 'Profit & Loss']
  },
  {
    id: 'quant-3',
    category: 'quantitative',
    topic: 'Ratios & Proportions',
    difficulty: 'easy',
    question: 'If the ratio of engineers to designers in a startup is 7:3 and there are 21 engineers, how many designers are there?',
    options: ['6', '9', '12', '14'],
    correctAnswer: 1,
    explanation: '7 units = 21, so 1 unit = 3. Designers = 3 * 3 = 9.',
    skills: ['Quantitative Aptitude', 'Ratios']
  },
  {
    id: 'quant-4',
    category: 'quantitative',
    topic: 'Time and Work',
    difficulty: 'medium',
    question: 'Person A can complete a software sprint task in 12 days, and Person B can complete the same task in 6 days. Working together, how many days will they take?',
    options: ['3 days', '4 days', '5 days', '8 days'],
    correctAnswer: 1,
    explanation: 'Combined daily rate = 1/12 + 1/6 = 1/12 + 2/12 = 3/12 = 1/4 task per day. Total time = 4 days.',
    skills: ['Quantitative Aptitude', 'Time & Work']
  },
  {
    id: 'quant-5',
    category: 'quantitative',
    topic: 'Time, Speed and Distance',
    difficulty: 'medium',
    question: 'A train traveling at 72 km/h crosses a 200m long platform in 20 seconds. What is the length of the train?',
    options: ['150 m', '200 m', '250 m', '300 m'],
    correctAnswer: 1,
    explanation: 'Speed in m/s = 72 * (5/18) = 20 m/s. Total distance in 20s = 20 * 20 = 400 m. Train length = 400 - 200 = 200 m.',
    skills: ['Quantitative Aptitude', 'Speed & Distance']
  },
  {
    id: 'quant-6',
    category: 'quantitative',
    topic: 'Probability',
    difficulty: 'hard',
    question: 'Two fair six-sided dice are rolled simultaneously. What is the probability that the sum of the numbers showing is at least 10?',
    options: ['1/6', '1/9', '5/36', '1/4'],
    correctAnswer: 0,
    explanation: 'Total outcomes = 36. Outcomes with sum >= 10: (4,6), (5,5), (5,6), (6,4), (6,5), (6,6) = 6 outcomes. Probability = 6/36 = 1/6.',
    skills: ['Quantitative Aptitude', 'Probability']
  },
  {
    id: 'quant-7',
    category: 'quantitative',
    topic: 'Averages',
    difficulty: 'easy',
    question: 'The average score of 4 project modules is 85. If a 5th module score of 95 is added, what is the new overall average?',
    options: ['86', '87', '88', '89'],
    correctAnswer: 1,
    explanation: 'Sum of 4 modules = 4 * 85 = 340. New total with 5th module = 340 + 95 = 435. New average = 435 / 5 = 87.',
    skills: ['Quantitative Aptitude', 'Averages']
  },
  {
    id: 'quant-8',
    category: 'quantitative',
    topic: 'Permutations & Combinations',
    difficulty: 'hard',
    question: 'From a pool of 8 software engineers, a team of 3 needs to be selected for a critical deployment. How many different combinations can be formed?',
    options: ['24', '56', '120', '336'],
    correctAnswer: 1,
    explanation: 'Combination formula 8C3 = 8! / (3! * 5!) = (8 * 7 * 6) / (3 * 2 * 1) = 56 combinations.',
    skills: ['Quantitative Aptitude', 'Combinatorics']
  },
  {
    id: 'quant-9',
    category: 'quantitative',
    topic: 'Data Interpretation',
    difficulty: 'medium',
    question: 'A tech platform has 250,000 monthly active users. 40% are on Mobile Web, 35% on iOS, and the remainder on Android. How many active users are on Android?',
    options: ['50,000', '62,500', '75,000', '87,500'],
    correctAnswer: 1,
    explanation: 'Android percentage = 100% - (40% + 35%) = 25%. Android users = 25% of 250,000 = 62,500.',
    skills: ['Quantitative Aptitude', 'Data Interpretation']
  },

  // ==========================================
  // LOGICAL REASONING: Sequences, Puzzles & Deduction
  // ==========================================
  {
    id: 'logic-1',
    category: 'logical',
    topic: 'Number Series',
    difficulty: 'easy',
    question: 'What is the next number in the sequence: 4, 9, 16, 25, 36, ...?',
    options: ['45', '48', '49', '50'],
    correctAnswer: 2,
    explanation: 'The sequence consists of consecutive perfect squares: 2^2=4, 3^2=9, 4^2=16, 5^2=25, 6^2=36, 7^2=49.',
    skills: ['Logical Reasoning', 'Pattern Recognition']
  },
  {
    id: 'logic-2',
    category: 'logical',
    topic: 'Number Series',
    difficulty: 'medium',
    question: 'Find the next term in the series: 3, 7, 15, 31, 63, ...?',
    options: ['95', '125', '127', '128'],
    correctAnswer: 2,
    explanation: 'Each term is generated by (previous * 2) + 1: (3*2)+1=7, (7*2)+1=15, (15*2)+1=31, (31*2)+1=63, (63*2)+1=127.',
    skills: ['Logical Reasoning', 'Pattern Recognition']
  },
  {
    id: 'logic-3',
    category: 'logical',
    topic: 'Coding-Decoding',
    difficulty: 'easy',
    question: 'In a certain cipher, "REACT" is coded as "SGBDU" (each letter shifted forward by 1). How is "CODE" coded?',
    options: ['DPEF', 'DOEF', 'EPFE', 'DPFF'],
    correctAnswer: 0,
    explanation: 'Shift each letter forward by 1: C -> D, O -> P, D -> E, E -> F. Hence "DPEF".',
    skills: ['Logical Reasoning', 'Coding & Decoding']
  },
  {
    id: 'logic-4',
    category: 'logical',
    topic: 'Syllogisms',
    difficulty: 'medium',
    question: 'Given statements:\n1. All developers are problem solvers.\n2. Some problem solvers are designers.\nWhich conclusion logically follows?',
    options: [
      'All designers are developers',
      'Some developers are designers',
      'Some problem solvers are developers',
      'No developers are designers'
    ],
    correctAnswer: 2,
    explanation: 'Since all developers are problem solvers, the set of problem solvers necessarily contains all developers. Therefore, some problem solvers are definitely developers.',
    skills: ['Logical Reasoning', 'Deduction']
  },
  {
    id: 'logic-5',
    category: 'logical',
    topic: 'Puzzles & Arrangements',
    difficulty: 'hard',
    question: 'Five developers (A, B, C, D, E) sit in a row facing North. C sits in the exact middle. A is immediately to the right of C. D is at one of the ends. If B is not adjacent to D, who sits on the extreme left?',
    options: ['D', 'B', 'E', 'A'],
    correctAnswer: 0,
    explanation: '5 positions: [1, 2, 3, 4, 5]. C is at pos 3. A is immediately right of C (pos 4). Positions remain: 1, 2, 5. D is at an end (pos 1 or 5). If D is at pos 5, B cannot be adjacent to D, so B is at 1 or 2. If D is at pos 1 (extreme left), B is at pos 5 and E is at pos 2, which satisfies all conditions cleanly.',
    skills: ['Logical Reasoning', 'Puzzles']
  },
  {
    id: 'logic-6',
    category: 'logical',
    topic: 'Logical Deductions',
    difficulty: 'medium',
    question: 'If "No bugs are fatal" and "All runtime errors are bugs", which statement must be true?',
    options: [
      'All runtime errors are fatal',
      'No runtime errors are fatal',
      'Some fatal issues are bugs',
      'All bugs are runtime errors'
    ],
    correctAnswer: 1,
    explanation: 'Since all runtime errors belong to the category of bugs, and no bug is fatal, no runtime error can ever be fatal.',
    skills: ['Logical Reasoning', 'Critical Thinking']
  },

  // ==========================================
  // CODING: Output Prediction & Code Analysis
  // ==========================================
  {
    id: 'coding-js-1',
    category: 'coding',
    topic: 'Output Prediction',
    difficulty: 'easy',
    question: 'What will be printed to the console when the following JavaScript snippet runs?',
    codeSnippet: `console.log(typeof NaN);\nconsole.log(NaN === NaN);`,
    options: [
      '"undefined" and true',
      '"number" and false',
      '"NaN" and false',
      '"number" and true'
    ],
    correctAnswer: 1,
    explanation: 'In JavaScript, typeof NaN evaluates to "number". Furthermore, NaN is the only value in JavaScript that is not equal to itself, so NaN === NaN evaluates to false.',
    skills: ['JavaScript', 'Coding']
  },
  {
    id: 'coding-js-2',
    category: 'coding',
    topic: 'Output Prediction',
    difficulty: 'medium',
    question: 'What is the output of the following asynchronous code?',
    codeSnippet: `console.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');`,
    options: [
      '1, 2, 3, 4',
      '1, 4, 2, 3',
      '1, 4, 3, 2',
      '3, 1, 4, 2'
    ],
    correctAnswer: 2,
    explanation: 'Synchronous code runs first (1, 4). The microtask queue (Promise resolution) runs immediately after the sync call stack (3). The timer callback is a macrotask and runs last (2). Result: 1, 4, 3, 2.',
    skills: ['JavaScript', 'Asynchronous Programming', 'Coding']
  },
  {
    id: 'coding-js-3',
    category: 'coding',
    topic: 'Code Debugging',
    difficulty: 'medium',
    question: 'Identify why the following React snippet causes an infinite re-render loop:',
    codeSnippet: `function Counter() {\n  const [count, setCount] = useState(0);\n  setCount(count + 1);\n  return <div>{count}</div>;\n}`,
    options: [
      'The initial state is 0 instead of a string',
      'setCount is called directly inside the render body without being wrapped in useEffect or an event handler',
      'useState cannot be used with number types',
      'The component does not export default'
    ],
    correctAnswer: 1,
    explanation: 'Calling a state setter directly within the body of a functional component triggers an immediate state update during rendering, queueing another render, causing an infinite re-render loop.',
    skills: ['React', 'React Hooks', 'Debugging']
  },
  {
    id: 'coding-py-1',
    category: 'coding',
    topic: 'Output Prediction',
    difficulty: 'easy',
    question: 'What is the output of the following Python list comprehension?',
    codeSnippet: `nums = [1, 2, 3, 4, 5]\nresult = [x * 2 for x in nums if x % 2 != 0]\nprint(result)`,
    options: [
      '[2, 4, 6, 8, 10]',
      '[2, 6, 10]',
      '[4, 8]',
      '[1, 3, 5]'
    ],
    correctAnswer: 1,
    explanation: 'The if condition filters odd numbers [1, 3, 5]. The transformation multiplies each by 2: [1*2, 3*2, 5*2] = [2, 6, 10].',
    skills: ['Python', 'Coding']
  },
  {
    id: 'coding-java-1',
    category: 'coding',
    topic: 'Code Analysis',
    difficulty: 'medium',
    question: 'What is the output of the following Java snippet regarding String pool immutability?',
    codeSnippet: `String s1 = "SkillBridge";\nString s2 = new String("SkillBridge");\nSystem.out.println((s1 == s2) + " " + s1.equals(s2));`,
    options: [
      'true true',
      'false false',
      'false true',
      'true false'
    ],
    correctAnswer: 2,
    explanation: 'The == operator compares memory references. s1 points to the string pool literal while s2 points to a distinct heap object, returning false. The .equals() method compares textual character content, returning true.',
    skills: ['Java', 'Strings', 'Coding']
  },
  {
    id: 'coding-dsa-1',
    category: 'coding',
    topic: 'Algorithm Analysis',
    difficulty: 'hard',
    question: 'What is the average time complexity of searching for an element in a balanced Binary Search Tree (AVL / Red-Black Tree)?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 1,
    explanation: 'Because the tree is balanced, each comparison eliminates half the remaining subtrees, yielding O(log n) time complexity.',
    skills: ['Data Structures', 'DSA', 'Algorithms']
  },

  // ==========================================
  // DOMAIN-SPECIFIC: Data Analysis & Statistics
  // ==========================================
  {
    id: 'domain-da-1',
    category: 'domain',
    topic: 'Statistics',
    difficulty: 'easy',
    question: 'Which measure of central tendency is least sensitive to extreme outliers in skewed datasets?',
    options: ['Mean', 'Median', 'Mode', 'Variance'],
    correctAnswer: 1,
    explanation: 'The median represents the middle value of sorted observations and is resilient against extreme outlier values, unlike the arithmetic mean.',
    skills: ['Statistics', 'Data Analyst']
  },
  {
    id: 'domain-da-2',
    category: 'domain',
    topic: 'Pandas',
    difficulty: 'medium',
    question: 'In Python Pandas, which method is used to fill missing / null values across a DataFrame column?',
    options: ['df.dropna()', 'df.fillna()', 'df.replace_null()', 'df.impute()'],
    correctAnswer: 1,
    explanation: 'fillna() fills NA/NaN values using the specified method or constant replacement value.',
    skills: ['Pandas', 'Python', 'Data Analyst']
  },
  {
    id: 'domain-fe-1',
    category: 'domain',
    topic: 'Web Performance',
    difficulty: 'medium',
    question: 'Which browser metric measures the time from when a user first interacts with a page to when the browser begins processing the event handler?',
    options: [
      'Cumulative Layout Shift (CLS)',
      'First Input Delay (FID) / Interaction to Next Paint (INP)',
      'Largest Contentful Paint (LCP)',
      'Time to First Byte (TTFB)'
    ],
    correctAnswer: 1,
    explanation: 'FID / INP measures interactivity responsiveness from the user’s first physical interaction (click, tap, keypress) to event handler initiation.',
    skills: ['React', 'JavaScript', 'Web Performance']
  }
];

/**
 * Returns list of all available categories
 */
export const ASSESSMENT_CATEGORIES = [
  { id: 'technical', label: 'Technical Core', icon: 'FiCode' },
  { id: 'quantitative', label: 'Quantitative Aptitude', icon: 'FiPieChart' },
  { id: 'logical', label: 'Logical Reasoning', icon: 'FiCpu' },
  { id: 'coding', label: 'Code Analysis & Output', icon: 'FiTerminal' },
  { id: 'domain', label: 'Domain Specialization', icon: 'FiLayers' }
];
