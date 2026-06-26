import type { ExerciseType } from "@/components/exercise/exercise-badge"

interface BaseExercise {
  type: ExerciseType
  theory: string
  explanation: string
}

interface Option {
  id: string
  code: string
}

interface ReasonOption {
  id: string
  text: string
}

interface DebugExercise extends BaseExercise {
  type: "debug"
  code: string
  errorLine: number
  prompt: string
  correctAnswer: string
  correctOptionId: string
  options: Option[]
  aiErrorReason: string
}

interface EvaluateExercise extends BaseExercise {
  type: "evaluate"
  userPrompt: string
  aiResponse: string
  code: string
  isCodeCorrect: boolean
  correctReasonId: string
  reasonOptions: ReasonOption[]
}

interface CompleteExercise extends BaseExercise {
  type: "complete"
  codeTemplate: string
  blanks: { id: string; answer: string; hint?: string }[]
}

interface ExplainExercise extends BaseExercise {
  type: "explain"
  code: string
  correctOptionId: string
  options: ReasonOption[]
}

type Exercise = DebugExercise | EvaluateExercise | CompleteExercise | ExplainExercise

export const exerciseData: Record<string, Record<string, Exercise[]>> = {
  python: {
    basico: [
      {
        type: "debug",
        theory: "Las variables almacenan valores. En Python se declaran sin tipo explícito. Usa = para asignar y == para comparar.",
        code: `def is_adult(age):
    if age = 18:
        return True
    return False

print(is_adult(20))`,
        errorLine: 2,
        prompt: "Este código tiene un bug común. La función debería retornar True si la edad es 18 o mayor. ¿Cuál de estas versiones corrige el bug?",
        options: [
          {
            id: "a",
            code: `def is_adult(age):
    if age = 18:
        return True
    return False`,
          },
          {
            id: "b",
            code: `def is_adult(age):
    if age == 18:
        return True
    return False`,
          },
          {
            id: "c",
            code: `def is_adult(age):
    if age >= 18:
        return True
    return False`,
          },
          {
            id: "d",
            code: `def is_adult(age):
    if age != 18:
        return True
    return False`,
          },
        ],
        correctOptionId: "c",
        correctAnswer: ">= 18",
        explanation: "La condición correcta es >= 18 para incluir exactamente los mayores de 18. Además el operador de comparación es == no =, que es asignación.",
        aiErrorReason: "La IA confunde = (asignación) con == (comparación) porque en lenguaje natural decimos 'si edad es igual a 18' y traduce literalmente.",
      },
      {
        type: "evaluate",
        theory: "Los loops for en Python iteran sobre secuencias. range(n) genera números del 0 al n-1.",
        userPrompt: "Escribe un código que imprima los números del 1 al 5",
        aiResponse: "Aquí tienes el código para imprimir los números del 1 al 5:",
        code: `for i in range(5):
    print(i)`,
        isCodeCorrect: false,
        reasonOptions: [
          { id: "a", text: "El código es correcto, range(5) genera exactamente los números del 1 al 5" },
          { id: "b", text: "El código tiene un error: range(5) genera del 0 al 4, no del 1 al 5" },
          { id: "c", text: "El código tiene un error: falta un print adicional al final" },
          { id: "d", text: "El código tiene un error: debería usar while en lugar de for" },
        ],
        correctReasonId: "b",
        explanation: "El código imprime del 0 al 4, no del 1 al 5. Para imprimir del 1 al 5 deberías usar range(1, 6) porque range(inicio, fin) genera números desde inicio hasta fin-1.",
      },
      {
        type: "complete",
        theory: "Las listas en Python son colecciones ordenadas. Usa append() para agregar elementos al final y len() para obtener la cantidad de elementos.",
        codeTemplate: `numbers = [1, 2, 3]
numbers.{{blank1}}(4)
total = {{blank2}}(numbers)
print(total)  # Debería imprimir 4`,
        blanks: [
          { id: "blank1", answer: "append", hint: "Método para agregar al final" },
          { id: "blank2", answer: "len", hint: "Función para contar elementos" },
        ],
        explanation: "append() agrega un elemento al final de la lista sin crear una nueva lista. len() retorna la cantidad de elementos.",
      },
      {
        type: "explain",
        theory: "Las funciones encapsulan lógica reutilizable. def define una función, return devuelve un valor.",
        code: `def double(x):
    return x * 2

result = double(5)
print(result)`,
        options: [
          { id: "a", text: "La función imprime el número x dos veces en pantalla" },
          { id: "b", text: "La función recibe un número, lo multiplica por 2 y retorna el resultado. double(5) retorna 10" },
          { id: "c", text: "La función suma x + x y guarda el resultado en result sin retornarlo" },
          { id: "d", text: "La función divide x entre 2 y muestra el resultado" },
        ],
        correctOptionId: "b",
        explanation: "La función double toma un número, lo multiplica por 2 y lo retorna. Cuando se llama con 5, calcula 5 * 2 = 10 y lo guarda en result. El print muestra 10.",
      },
    ],
  },
  javascript: {
    basico: [
      {
        type: "debug",
        theory: "En JavaScript, usa === para comparación estricta (valor Y tipo). == hace conversión de tipos, lo cual puede dar resultados inesperados.",
        code: `function isZero(value) {
    if (value == false) {
        return true;
    }
    return false;
}

console.log(isZero(0));    // true
console.log(isZero(""));   // true - ¡inesperado!`,
        errorLine: 2,
        prompt: "La función debería retornar true solo si el valor es exactamente 0. ¿Cuál de estas versiones corrige el bug?",
        options: [
          {
            id: "a",
            code: `function isZero(value) {
    if (value == false) {
        return true;
    }
    return false;
}`,
          },
          {
            id: "b",
            code: `function isZero(value) {
    if (value === 0) {
        return true;
    }
    return false;
}`,
          },
          {
            id: "c",
            code: `function isZero(value) {
    if (value !== false) {
        return true;
    }
    return false;
}`,
          },
          {
            id: "d",
            code: `function isZero(value) {
    if (value == 0) {
        return true;
    }
    return false;
}`,
          },
        ],
        correctOptionId: "b",
        correctAnswer: "=== en lugar de ==",
        explanation: "=== compara valor Y tipo. 0 === 0 es true, pero '' === 0 es false. Con == hay coerción de tipos y '' == false es true, lo cual es un bug.",
        aiErrorReason: "La IA usa == por brevedad o porque muchos ejemplos antiguos lo usan. En código moderno === es el estándar.",
      },
      {
        type: "evaluate",
        theory: "const declara variables que no pueden reasignarse. let declara variables que sí. var tiene scope de función (evítalo en código moderno).",
        userPrompt: "Crea un contador que se incremente",
        aiResponse: "Aquí tienes un contador simple:",
        code: `const counter = 0;
counter = counter + 1;
console.log(counter);`,
        isCodeCorrect: false,
        reasonOptions: [
          { id: "a", text: "El código es correcto, const permite reasignar valores numéricos" },
          { id: "b", text: "El código tiene un error: no se puede usar counter++ con const" },
          { id: "c", text: "El código tiene un error: const no permite reasignar. Debería usarse let" },
          { id: "d", text: "El código tiene un error: falta inicializar counter en 1 en lugar de 0" },
        ],
        correctReasonId: "c",
        explanation: "const no permite reasignar la variable. counter = counter + 1 lanza un TypeError. Para un valor que cambia, debes usar let: let counter = 0.",
      },
      {
        type: "complete",
        theory: "Las arrow functions son una sintaxis concisa para funciones. Para una expresión simple, puedes omitir llaves y return.",
        codeTemplate: `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.{{blank1}}(n {{blank2}} n * 2);
console.log(doubled);`,
        blanks: [
          { id: "blank1", answer: "map", hint: "Método que transforma cada elemento" },
          { id: "blank2", answer: "=>", hint: "Sintaxis de arrow function" },
        ],
        explanation: "map() crea un nuevo array aplicando una función a cada elemento. La arrow function n => n * 2 es equivalente a function(n) { return n * 2 }. Es el patrón más común para transformar arrays.",
      },
      {
        type: "explain",
        theory: "Los template literals (backticks) permiten interpolar variables y expresiones con ${...}.",
        code: `const name = "Ana";
const age = 25;
const message = \`Hola \${name}, tienes \${age * 12} meses\`;
console.log(message);`,
        options: [
          { id: "a", text: "El código imprime: Hola Ana, tienes 25 meses" },
          { id: "b", text: "El código usa concatenación con + para unir name y age en un string" },
          { id: "c", text: "El código imprime: Hola Ana, tienes 300 meses, usando template literals para interpolar variables y expresiones" },
          { id: "d", text: "El código lanza un error porque no se puede multiplicar age dentro de un string" },
        ],
        correctOptionId: "c",
        explanation: "Los template literals usan backticks. ${name} inserta 'Ana', ${age * 12} evalúa 25 * 12 = 300. El output es 'Hola Ana, tienes 300 meses'.",
      },
    ],
    intermedio: [
      {
        type: "debug",
        theory: "Las promesas representan valores futuros. async/await es sintaxis para trabajar con promesas de forma más legible.",
        code: `async function fetchUser(id) {
    const response = fetch(\`/api/users/\${id}\`);
    const data = response.json();
    return data;
}`,
        errorLine: 2,
        prompt: "Esta función async no espera correctamente la respuesta del servidor. ¿Cuál de estas versiones corrige el bug?",
        options: [
          {
            id: "a",
            code: `async function fetchUser(id) {
    const response = fetch(\`/api/users/\${id}\`);
    const data = response.json();
    return data;
}`,
          },
          {
            id: "b",
            code: `async function fetchUser(id) {
    const response = await fetch(\`/api/users/\${id}\`);
    const data = response.json();
    return data;
}`,
          },
          {
            id: "c",
            code: `async function fetchUser(id) {
    const response = await fetch(\`/api/users/\${id}\`);
    const data = await response.json();
    return data;
}`,
          },
          {
            id: "d",
            code: `function fetchUser(id) {
    const response = fetch(\`/api/users/\${id}\`);
    const data = response.json();
    return data;
}`,
          },
        ],
        correctOptionId: "c",
        correctAnswer: "await antes de fetch y response.json()",
        explanation: "fetch() y response.json() retornan Promises. Sin await, obtenés la Promise, no el valor. Necesitás await en ambas llamadas para esperar el resultado real.",
        aiErrorReason: "La IA omite await porque el código parece correcto sintácticamente. Siempre que veas fetch, .json() o funciones async, verificá que tengan await.",
      },
      {
        type: "complete",
        theory: "Destructuring extrae valores de objetos y arrays en variables. Muy útil para parámetros de funciones.",
        codeTemplate: `const user = { name: "Ana", age: 25, city: "Madrid" };
const { {{blank1}}, {{blank2}} } = user;
console.log(name, age);`,
        blanks: [
          { id: "blank1", answer: "name", hint: "Propiedad del usuario" },
          { id: "blank2", answer: "age", hint: "Otra propiedad del usuario" },
        ],
        explanation: "Destructuring { name, age } = user extrae esas propiedades en variables con el mismo nombre. Es equivalente a const name = user.name; const age = user.age pero más conciso.",
      },
    ],
    avanzado: [
      {
        type: "evaluate",
        theory: "Los closures capturan variables del scope donde fueron creados. Esto permite crear funciones con 'memoria'.",
        userPrompt: "Crea una función que genere IDs únicos incrementales",
        aiResponse: "Uso un closure para mantener el contador:",
        code: `function createIdGenerator() {
    var id = 0;
    return function() {
        return id++;
    }
}

const getId = createIdGenerator();
console.log(getId()); // 0
console.log(getId()); // 1`,
        isCodeCorrect: true,
        reasonOptions: [
          { id: "a", text: "El código es correcto: el closure mantiene id en memoria entre llamadas, generando IDs únicos incrementales" },
          { id: "b", text: "El código tiene un error: id se resetea a 0 en cada llamada a getId()" },
          { id: "c", text: "El código tiene un error: var no funciona dentro de closures, debería usarse let" },
          { id: "d", text: "El código tiene un error: la función interna no puede acceder a id porque está en otro scope" },
        ],
        correctReasonId: "a",
        explanation: "El código es correcto. La función interna cierra sobre la variable id del scope externo. Cada llamada a getId() incrementa y retorna el mismo id porque la función interna mantiene una referencia a él.",
      },
    ],
  },
  typescript: {
    basico: [
      {
        type: "debug",
        theory: "TypeScript agrega tipos a JavaScript. Los tipos se infieren automáticamente pero puedes declararlos explícitamente con : tipo.",
        code: `function greet(name: string) {
    return "Hola " + name;
}

const message = greet(42);`,
        errorLine: 5,
        prompt: "TypeScript marca un error en este código. ¿Cuál de estas versiones lo corrige?",
        options: [
          {
            id: "a",
            code: `function greet(name: string) {
    return "Hola " + name;
}

const message = greet(42);`,
          },
          {
            id: "b",
            code: `function greet(name: string) {
    return "Hola " + name;
}

const message = greet("42");`,
          },
          {
            id: "c",
            code: `function greet(name: number) {
    return "Hola " + name;
}

const message = greet(42);`,
          },
          {
            id: "d",
            code: `function greet(name: any) {
    return "Hola " + name;
}

const message = greet(42);`,
          },
        ],
        correctOptionId: "b",
        correctAnswer: "pasar string en lugar de number",
        explanation: "La función greet declara name: string pero la llamamos con 42 (number). La solución correcta es pasar '42' como string. Usar any o cambiar el tipo a number son malas prácticas.",
        aiErrorReason: "La IA genera código JavaScript válido que no pasa el type checker de TypeScript. Siempre verificá que los tipos de los argumentos coincidan con los parámetros declarados.",
      },
      {
        type: "complete",
        theory: "Las interfaces definen la forma de los objetos. Describen qué propiedades debe tener un objeto y sus tipos.",
        codeTemplate: `{{blank1}} User {
    name: {{blank2}};
    age: number;
}

function greet(user: User) {
    return \`Hola \${user.name}\`;
}`,
        blanks: [
          { id: "blank1", answer: "interface", hint: "Palabra clave para definir tipos de objetos" },
          { id: "blank2", answer: "string", hint: "Tipo de dato para texto" },
        ],
        explanation: "interface define un contrato que los objetos deben cumplir. User dice que cualquier objeto de tipo User debe tener name (string) y age (number).",
      },
      {
        type: "explain",
        theory: "Los union types (|) permiten que una variable sea de múltiples tipos. Útil para valores que pueden ser de diferentes tipos.",
        code: `function formatValue(value: string | number): string {
    if (typeof value === "number") {
        return value.toFixed(2);
    }
    return value.toUpperCase();
}`,
        options: [
          { id: "a", text: "La función solo acepta strings y los convierte a número con toFixed" },
          { id: "b", text: "La función acepta string o number. Si es number lo formatea con 2 decimales, si es string lo convierte a mayúsculas" },
          { id: "c", text: "La función lanza un error si recibe un number porque el tipo de retorno es string" },
          { id: "d", text: "La función convierte cualquier valor a string usando toUpperCase" },
        ],
        correctOptionId: "b",
        explanation: "string | number es un union type. typeof value === 'number' es un type guard. En el if, TypeScript sabe que value es number (usa toFixed). En el else, sabe que es string (usa toUpperCase).",
      },
    ],
    intermedio: [
      {
        type: "evaluate",
        theory: "Los generics (<T>) permiten crear funciones y tipos que funcionan con múltiples tipos manteniendo type safety.",
        userPrompt: "Crea una función que retorne el primer elemento de un array",
        aiResponse: "Uso generics para mantener el tipo:",
        code: `function first<T>(arr: T[]): T {
    return arr[0];
}

const num = first([1, 2, 3]);     // tipo: number
const str = first(["a", "b"]);    // tipo: string`,
        isCodeCorrect: true,
        reasonOptions: [
          { id: "a", text: "El código es correcto: <T> infiere el tipo del array y lo mantiene en el retorno, preservando type safety" },
          { id: "b", text: "El código tiene un error: debería usar any en lugar de T para aceptar cualquier tipo" },
          { id: "c", text: "El código tiene un error: no se puede usar T[] como tipo de parámetro" },
          { id: "d", text: "El código tiene un error: la función debería retornar T | undefined porque el array podría estar vacío" },
        ],
        correctReasonId: "a",
        explanation: "El código es correcto. <T> es un tipo genérico que se infiere del argumento. Con [1, 2, 3], T es number. Con ['a', 'b'], T es string. Sin generics, tendríamos que usar any y perderíamos type safety.",
      },
      {
        type: "debug",
        theory: "Las propiedades opcionales se marcan con ?. Las propiedades requeridas deben estar siempre presentes.",
        code: `interface Config {
    url: string;
    timeout: number;
    retries?: number;
}

const config: Config = {
    url: "/api"
};`,
        errorLine: 7,
        prompt: "TypeScript marca un error en este objeto. ¿Cuál de estas versiones lo corrige?",
        options: [
          {
            id: "a",
            code: `const config: Config = {
    url: "/api"
};`,
          },
          {
            id: "b",
            code: `const config: Config = {
    url: "/api",
    retries: 3
};`,
          },
          {
            id: "c",
            code: `const config: Config = {
    url: "/api",
    timeout: 5000
};`,
          },
          {
            id: "d",
            code: `const config: Config = {
    url: "/api",
    timeout: 5000,
    retries: 3
};`,
          },
        ],
        correctOptionId: "c",
        correctAnswer: "timeout",
        explanation: "Config requiere url y timeout (sin ?). retries es opcional. La opción C agrega timeout que es lo mínimo requerido.",
        aiErrorReason: "La IA crea objetos incompletos porque en JavaScript es válido. TypeScript requiere que cumplas el contrato de la interface completamente.",
      },
    ],
    avanzado: [
      {
        type: "complete",
        theory: "Los utility types como Partial, Required, Pick, y Omit transforman tipos existentes. Muy útiles para evitar duplicación.",
        codeTemplate: `interface User {
    id: number;
    name: string;
    email: string;
}

// Para updates, todas las propiedades son opcionales
type UserUpdate = {{blank1}}<User>;

// Solo queremos id y name
type UserPreview = {{blank2}}<User, "id" | "name">;`,
        blanks: [
          { id: "blank1", answer: "Partial", hint: "Hace todas las propiedades opcionales" },
          { id: "blank2", answer: "Pick", hint: "Selecciona solo ciertas propiedades" },
        ],
        explanation: "Partial<User> convierte todas las propiedades en opcionales. Pick<User, 'id' | 'name'> crea un nuevo tipo solo con id y name. Estos utility types evitan definir múltiples interfaces similares.",
      },
    ],
  },
  sql: {
    basico: [
      {
        type: "debug",
        theory: "SELECT recupera datos. WHERE filtra filas. Los strings van entre comillas simples en SQL.",
        code: `SELECT name, email
FROM users
WHERE status = active`,
        errorLine: 3,
        prompt: "Esta query tiene un error de sintaxis. ¿Cuál de estas versiones lo corrige?",
        options: [
          {
            id: "a",
            code: `SELECT name, email
FROM users
WHERE status = active`,
          },
          {
            id: "b",
            code: `SELECT name, email
FROM users
WHERE status = "active"`,
          },
          {
            id: "c",
            code: `SELECT name, email
FROM users
WHERE status = 'active'`,
          },
          {
            id: "d",
            code: `SELECT name, email
FROM users
WHERE status == 'active'`,
          },
        ],
        correctOptionId: "c",
        correctAnswer: "comillas simples en active",
        explanation: "En SQL los strings van entre comillas simples: 'active'. Las comillas dobles no son estándar en todos los motores SQL y == no existe en SQL.",
        aiErrorReason: "La IA omite comillas porque en el contexto de la conversación el valor parece obvio. SQL es estricto con la sintaxis.",
      },
      {
        type: "complete",
        theory: "ORDER BY ordena resultados. ASC es ascendente (A-Z, 1-9), DESC es descendente. Por defecto es ASC.",
        codeTemplate: `SELECT name, age
FROM employees
{{blank1}} BY age {{blank2}}`,
        blanks: [
          { id: "blank1", answer: "ORDER", hint: "Palabra clave para ordenar" },
          { id: "blank2", answer: "DESC", hint: "De mayor a menor" },
        ],
        explanation: "ORDER BY age DESC ordena los empleados por edad de mayor a menor. Sin DESC, el orden sería ascendente.",
      },
      {
        type: "explain",
        theory: "COUNT() cuenta filas. GROUP BY agrupa filas con el mismo valor. Útil para estadísticas.",
        code: `SELECT department, COUNT(*) as total
FROM employees
GROUP BY department`,
        options: [
          { id: "a", text: "La query retorna todos los empleados ordenados por departamento" },
          { id: "b", text: "La query cuenta cuántos empleados hay en cada departamento, agrupando por department" },
          { id: "c", text: "La query retorna solo los departamentos que tienen más de un empleado" },
          { id: "d", text: "La query suma los salarios de todos los empleados por departamento" },
        ],
        correctOptionId: "b",
        explanation: "GROUP BY agrupa las filas por department. COUNT(*) cuenta las filas de cada grupo. El resultado muestra cada departamento con su cantidad de empleados.",
      },
    ],
    intermedio: [
      {
        type: "evaluate",
        theory: "JOIN combina datos de múltiples tablas. INNER JOIN solo incluye filas que tienen match en ambas tablas.",
        userPrompt: "Muestra los pedidos con el nombre del cliente",
        aiResponse: "Uso JOIN para combinar las tablas:",
        code: `SELECT orders.id, customers.name
FROM orders, customers
WHERE orders.customer_id = customers.id`,
        isCodeCorrect: true,
        reasonOptions: [
          { id: "a", text: "El código es correcto y usa la sintaxis moderna de INNER JOIN" },
          { id: "b", text: "El código funciona pero usa sintaxis antigua de implicit join. La forma moderna sería con INNER JOIN explícito" },
          { id: "c", text: "El código tiene un error: no se puede usar WHERE para relacionar tablas" },
          { id: "d", text: "El código tiene un error: falta especificar el tipo de JOIN" },
        ],
        correctReasonId: "b",
        explanation: "Aunque funciona, esta sintaxis (implicit join) es menos clara. La forma moderna es con INNER JOIN explícito. Ambas producen el mismo resultado, pero INNER JOIN es más legible.",
      },
      {
        type: "debug",
        theory: "WHERE filtra antes de agrupar, HAVING filtra después de agrupar. Usa HAVING con funciones de agregación.",
        code: `SELECT department, AVG(salary)
FROM employees
WHERE AVG(salary) > 50000
GROUP BY department`,
        errorLine: 3,
        prompt: "Esta query debería mostrar departamentos con salario promedio mayor a 50000. ¿Cuál de estas versiones lo corrige?",
        options: [
          {
            id: "a",
            code: `SELECT department, AVG(salary)
FROM employees
WHERE AVG(salary) > 50000
GROUP BY department`,
          },
          {
            id: "b",
            code: `SELECT department, AVG(salary)
FROM employees
GROUP BY department
WHERE AVG(salary) > 50000`,
          },
          {
            id: "c",
            code: `SELECT department, AVG(salary)
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000`,
          },
          {
            id: "d",
            code: `SELECT department, AVG(salary)
FROM employees
HAVING AVG(salary) > 50000
GROUP BY department`,
          },
        ],
        correctOptionId: "c",
        correctAnswer: "HAVING en lugar de WHERE",
        explanation: "WHERE se ejecuta antes del GROUP BY y no puede usar funciones de agregación como AVG. HAVING se ejecuta después, cuando ya existen los grupos.",
        aiErrorReason: "La IA confunde WHERE y HAVING porque ambos filtran. WHERE filtra filas individuales, HAVING filtra grupos calculados.",
      },
    ],
    avanzado: [
      {
        type: "complete",
        theory: "Las subqueries son queries dentro de queries. Útiles para comparar con valores calculados.",
        codeTemplate: `SELECT name, salary
FROM employees
WHERE salary > (
    {{blank1}} {{blank2}}(salary)
    FROM employees
)`,
        blanks: [
          { id: "blank1", answer: "SELECT", hint: "Palabra clave para consultar" },
          { id: "blank2", answer: "AVG", hint: "Función para calcular promedio" },
        ],
        explanation: "La subquery calcula el salario promedio. La query principal compara cada salario con ese promedio y solo retorna los que ganan más.",
      },
    ],
  },
}