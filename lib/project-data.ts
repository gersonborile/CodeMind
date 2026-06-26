interface ProjectBlank {
  id: string
  answer: string
  hint: string
}

interface MiniProject {
  title: string
  description: string
  codeTemplate: string
  blanks: ProjectBlank[]
  explanation: string
}

export const projectData: Record<string, Record<string, MiniProject>> = {
  python: {
    basico: {
      title: "Calculadora de promedio",
      description: "Completá la función que recibe una lista de números y calcula su promedio usando las funciones built-in de Python.",
      codeTemplate: `numeros = [85, 92, 78, 90, 88]

def calcular_promedio({{blank1}}):
    total = {{blank2}}(numeros)
    cantidad = {{blank3}}(numeros)
    return total / cantidad

resultado = calcular_promedio(numeros)
print(resultado)`,
      blanks: [
        { id: "blank1", answer: "numeros", hint: "El parámetro que recibe la lista" },
        { id: "blank2", answer: "sum", hint: "Función que suma todos los elementos" },
        { id: "blank3", answer: "len", hint: "Función que cuenta los elementos" },
      ],
      explanation: "sum() suma todos los elementos de la lista y len() cuenta cuántos hay. Dividir la suma por la cantidad da el promedio. Pasar numeros como parámetro hace la función reutilizable con cualquier lista.",
    },
    intermedio: {
      title: "Procesador de notas",
      description: "Completá la función que procesa un diccionario de estudiantes y retorna solo los que aprobaron, usando get() para acceso seguro.",
      codeTemplate: `estudiantes = {
    "Ana": {"nota": 85, "materia": "Python"},
    "Juan": {"nota": 45, "materia": "Python"},
    "Maria": {"nota": 92, "materia": "Python"},
}

def obtener_aprobados({{blank1}}, nota_minima=60):
    aprobados = {}
    for nombre, datos in estudiantes.{{blank2}}():
        nota = datos.{{blank3}}("nota", 0)
        if nota >= nota_minima:
            aprobados[nombre] = datos
    return aprobados

resultado = obtener_aprobados(estudiantes)
print(resultado)`,
      blanks: [
        { id: "blank1", answer: "estudiantes", hint: "El parámetro que recibe el diccionario" },
        { id: "blank2", answer: "items", hint: "Método para iterar clave y valor" },
        { id: "blank3", answer: "get", hint: "Método seguro para acceder a claves" },
      ],
      explanation: "items() retorna pares clave-valor para iterar el diccionario. get('nota', 0) accede a la clave 'nota' y retorna 0 si no existe, evitando KeyError. Este patrón es más robusto que acceder directamente con [].",
    },
    avanzado: {
      title: "Decorador de tiempo",
      description: "Completá el decorador que mide cuánto tarda en ejecutarse cualquier función.",
      codeTemplate: `import time

def medir_tiempo({{blank1}}):
    def wrapper(*args, **kwargs):
        inicio = time.time()
        resultado = {{blank2}}(*args, **kwargs)
        fin = time.time()
        print(f"Tiempo: {fin - inicio:.4f}s")
        return resultado
    return {{blank3}}

@medir_tiempo
def proceso_lento():
    time.sleep(0.1)
    return "listo"

proceso_lento()`,
      blanks: [
        { id: "blank1", answer: "func", hint: "La función que recibe el decorador" },
        { id: "blank2", answer: "func", hint: "Llamada a la función original" },
        { id: "blank3", answer: "wrapper", hint: "La función interna que retornamos" },
      ],
      explanation: "El decorador recibe func, define wrapper que mide el tiempo antes y después de llamar a func, y retorna wrapper. @medir_tiempo reemplaza proceso_lento por wrapper, por eso cada llamada mide el tiempo automáticamente.",
    },
  },
  javascript: {
    basico: {
      title: "Calculadora de precios",
      description: "Completá el código que transforma una lista de precios aplicando descuento y calcula el total.",
      codeTemplate: `const precios = [100, 250, 80, 320, 150];
const descuento = 0.1;

const preciosConDescuento = precios.{{blank1}}(precio => precio * (1 - descuento));
const total = preciosConDescuento.{{blank2}}((acc, precio) => acc + precio, 0);

console.log(\`Total con descuento: \$\{total\}\`);`,
      blanks: [
        { id: "blank1", answer: "map", hint: "Método que transforma cada elemento" },
        { id: "blank2", answer: "reduce", hint: "Método que acumula un valor" },
      ],
      explanation: "map() transforma cada precio aplicando el descuento sin modificar el array original. reduce() acumula todos los precios en un solo valor empezando desde 0. Es el patrón clásico de transformar y agregar datos en JavaScript.",
    },
    intermedio: {
      title: "Buscador de usuarios",
      description: "Completá la función async que busca un usuario y maneja correctamente el caso donde no existe.",
      codeTemplate: `async function buscarUsuario(id) {
    {{blank1}} {
        const respuesta = {{blank2}} fetch(\`/api/usuarios/\${id}\`);
        const datos = {{blank3}} respuesta.json();
        return datos;
    } catch (error) {
        console.error("Usuario no encontrado:", error);
        return null;
    }
}

buscarUsuario(1).then(usuario => console.log(usuario));`,
      blanks: [
        { id: "blank1", answer: "try", hint: "Palabra clave para intentar" },
        { id: "blank2", answer: "await", hint: "Esperar la promesa de fetch" },
        { id: "blank3", answer: "await", hint: "Esperar la promesa de json()" },
      ],
      explanation: "try/catch captura errores de red o de servidor. Los dos await son necesarios: el primero espera la respuesta HTTP, el segundo espera que se parsee el JSON. Sin await, obtenés Promises en lugar de valores.",
    },
    avanzado: {
      title: "Generador de IDs",
      description: "Completá el closure que genera IDs únicos incrementales con un prefijo personalizable.",
      codeTemplate: `function crearGenerador({{blank1}}) {
    let contador = 0;
    return {{blank2}} () => {
        contador++;
        return \`\${prefijo}-\${contador}\`;
    };
}

const generarUsuarioId = crearGenerador("USR");
console.log(generarUsuarioId()); // USR-1
console.log(generarUsuarioId()); // USR-2`,
      blanks: [
        { id: "blank1", answer: "prefijo", hint: "El parámetro del prefijo" },
        { id: "blank2", answer: "function", hint: "Palabra clave para la función interna" },
      ],
      explanation: "El closure captura tanto prefijo como contador del scope externo. Cada llamada a la función interna incrementa el mismo contador porque mantiene una referencia a él. Esto permite crear múltiples generadores independientes con distintos prefijos.",
    },
  },
  typescript: {
    basico: {
      title: "Formateador de nombres",
      description: "Completá la función tipada que formatea un nombre completo con diferentes estilos.",
      codeTemplate: `{{blank1}} EstiloNombre = "completo" | "iniciales" | "informal";

function formatearNombre(
    nombre: {{blank2}},
    apellido: string,
    estilo: EstiloNombre = "completo"
): string {
    if (estilo === "completo") return \`\${nombre} \${apellido}\`;
    if (estilo === "iniciales") return \`\${nombre[0]}. \${apellido[0]}.\`;
    return nombre;
}

console.log(formatearNombre("Ana", "García", "completo"));
console.log(formatearNombre("Ana", "García", "iniciales"));`,
      blanks: [
        { id: "blank1", answer: "type", hint: "Palabra clave para definir un tipo" },
        { id: "blank2", answer: "string", hint: "Tipo de dato para texto" },
      ],
      explanation: "type define un union type con los valores posibles. Esto hace que TypeScript rechace cualquier valor que no sea 'completo', 'iniciales' o 'informal'. El parámetro con = 'completo' es el valor por defecto si no se pasa el estilo.",
    },
    intermedio: {
      title: "Carrito de compras genérico",
      description: "Completá la interface genérica que representa un carrito de compras tipado.",
      codeTemplate: `interface Producto {
    id: number;
    nombre: string;
    precio: number;
}

interface Carrito<{{blank1}}> {
    items: T[];
    agregar: (item: {{blank2}}) => void;
    total: () => {{blank3}};
}

const carrito: Carrito<Producto> = {
    items: [],
    agregar(item) { this.items.push(item); },
    total() { return this.items.reduce((acc, p) => acc + p.precio, 0); }
};`,
      blanks: [
        { id: "blank1", answer: "T", hint: "Nombre del tipo genérico" },
        { id: "blank2", answer: "T", hint: "El tipo del item a agregar" },
        { id: "blank3", answer: "number", hint: "Tipo de retorno del total" },
      ],
      explanation: "T es el tipo genérico que se define al usar la interface. Carrito<Producto> crea un carrito específico para Productos. Esto permite reutilizar la misma interface para cualquier tipo de item sin perder type safety.",
    },
    avanzado: {
      title: "Tipos de formulario opcionales",
      description: "Completá los utility types que transforman un formulario a su versión editable.",
      codeTemplate: `interface FormularioUsuario {
    nombre: string;
    email: string;
    edad: number;
    rol: string;
}

// Para edición, todos los campos son opcionales
type FormularioEdicion = {{blank1}}<FormularioUsuario>;

// Solo los campos públicos
type FormularioPublico = {{blank2}}<FormularioUsuario, "nombre" | "email">;

// Sin el campo rol
type FormularioSinRol = {{blank3}}<FormularioUsuario, "rol">;`,
      blanks: [
        { id: "blank1", answer: "Partial", hint: "Hace todas las propiedades opcionales" },
        { id: "blank2", answer: "Pick", hint: "Selecciona solo ciertas propiedades" },
        { id: "blank3", answer: "Omit", hint: "Excluye ciertas propiedades" },
      ],
      explanation: "Partial hace todas las propiedades opcionales para edición parcial. Pick selecciona solo las propiedades que querés exponer públicamente. Omit excluye propiedades específicas. Los tres evitan duplicar interfaces similares.",
    },
  },
  sql: {
    basico: {
      title: "Promedio de notas por materia",
      description: "Completá la query que calcula el promedio de notas agrupado por materia.",
      codeTemplate: `SELECT 
    materia,
    {{blank1}}(nota) as promedio,
    {{blank2}}(*) as cantidad_alumnos
FROM examenes
{{blank3}} BY materia
ORDER BY promedio DESC;`,
      blanks: [
        { id: "blank1", answer: "AVG", hint: "Función para calcular promedio" },
        { id: "blank2", answer: "COUNT", hint: "Función para contar filas" },
        { id: "blank3", answer: "GROUP", hint: "Cláusula para agrupar" },
      ],
      explanation: "AVG() calcula el promedio de los valores. COUNT(*) cuenta las filas de cada grupo. GROUP BY agrupa las filas por materia antes de aplicar las funciones de agregación. ORDER BY DESC muestra primero las materias con mejor promedio.",
    },
    intermedio: {
      title: "Estudiantes y sus cursos",
      description: "Completá la query que muestra cada estudiante con el nombre de su curso usando JOIN.",
      codeTemplate: `SELECT 
    e.nombre as estudiante,
    c.nombre as curso,
    e.nota
FROM estudiantes e
{{blank1}} JOIN cursos c
    {{blank2}} e.curso_id = c.id
WHERE e.nota {{blank3}} 60
ORDER BY e.nota DESC;`,
      blanks: [
        { id: "blank1", answer: "INNER", hint: "Tipo de JOIN que requiere match en ambas tablas" },
        { id: "blank2", answer: "ON", hint: "Palabra clave para la condición del JOIN" },
        { id: "blank3", answer: ">=", hint: "Operador mayor o igual" },
      ],
      explanation: "INNER JOIN combina filas que tienen match en ambas tablas. ON define la condición de unión entre curso_id y id. >= 60 filtra solo los aprobados. Los alias e y c hacen el código más legible.",
    },
    avanzado: {
      title: "Empleados sobre el promedio",
      description: "Completá la query con subquery que encuentra empleados que ganan más que el promedio de su departamento.",
      codeTemplate: `SELECT 
    e.nombre,
    e.salario,
    e.departamento
FROM empleados e
WHERE e.salario > (
    {{blank1}} {{blank2}}(salario)
    FROM empleados
    WHERE departamento = {{blank3}}.departamento
);`,
      blanks: [
        { id: "blank1", answer: "SELECT", hint: "Palabra clave para la subquery" },
        { id: "blank2", answer: "AVG", hint: "Función para calcular el promedio" },
        { id: "blank3", answer: "e", hint: "Alias de la tabla externa" },
      ],
      explanation: "La subquery correlacionada se ejecuta una vez por cada fila de la query principal. e.departamento en la subquery referencia el departamento del empleado actual, comparando su salario contra el promedio de su propio departamento.",
    },
  },
}