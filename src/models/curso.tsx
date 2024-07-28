// export class Curso {
//   private id_curso: number;
//   private clave: string;
//   private nombre: string;
//   private nombre_ingles: string;
//   private horas_teoricas: number;
//   private horas_practicas: number;
//   private horas_independientes: number;
//   private horas_semana: number;
//   private horas_semestre: number;

//   constructor(
//     id_curso: number,
//     clave: string,
//     nombre: string,
//     nombre_ingles: string,
//     horas_teoricas: number,
//     horas_practicas: number,
//     horas_independientes: number,
//     horas_semana: number,
//     horas_semestre: number
//   ) {
//     this.id_curso = id_curso;
//     this.clave = clave;
//     this.nombre = nombre;
//     this.nombre_ingles = nombre_ingles;
//     this.horas_teoricas = horas_teoricas;
//     this.horas_practicas = horas_practicas;
//     this.horas_independientes = horas_independientes;
//     this.horas_semana = horas_semana;
//     this.horas_semestre = horas_semestre;
//   }

//   // Getters
//   public getIdCurso(): number {
//     return this.id_curso;
//   }

//   public getClave(): string {
//     return this.clave;
//   }

//   public getNombre(): string {
//     return this.nombre;
//   }

//   public getNombreIngles(): string {
//     return this.nombre_ingles;
//   }

//   public getHorasTeoricas(): number {
//     return this.horas_teoricas;
//   }

//   public getHorasPracticas(): number {
//     return this.horas_practicas;
//   }

//   public getHorasIndependientes(): number {
//     return this.horas_independientes;
//   }

//   public getHorasSemana(): number {
//     return this.horas_semana;
//   }

//   public getHorasSemestre(): number {
//     return this.horas_semestre;
//   }

//   // Setters
//   public setIdCurso(id_curso: number): void {
//     this.id_curso = id_curso;
//   }

//   public setClave(clave: string): void {
//     this.clave = clave;
//   }

//   public setNombre(nombre: string): void {
//     this.nombre = nombre;
//   }

//   public setNombreIngles(nombre_ingles: string): void {
//     this.nombre_ingles = nombre_ingles;
//   }

//   public setHorasTeoricas(horas_teoricas: number): void {
//     this.horas_teoricas = horas_teoricas;
//   }

//   public setHorasPracticas(horas_practicas: number): void {
//     this.horas_practicas = horas_practicas;
//   }

//   public setHorasIndependientes(horas_independientes: number): void {
//     this.horas_independientes = horas_independientes;
//   }

//   public setHorasSemana(horas_semana: number): void {
//     this.horas_semana = horas_semana;
//   }

//   public setHorasSemestre(horas_semestre: number): void {
//     this.horas_semestre = horas_semestre;
//   }
// }

export interface Curso {
  id_curso: number;
  clave: string;
  nombre: string;
  nombre_ingles: string;
  horas_teoricas: number;
  horas_practicas: number;
  horas_independientes: number;
  horas_semana: number;
  horas_semestre: number;
}
