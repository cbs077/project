export class SearchMovieModel {
   constructor(
      public id : number,
      public category: string,
      public title: string,
      public contents: string, 
      public author: string
   ) {}
}