export interface Bus {
  id:string;
  busName:string;
  source:string;
  destination:string;
  departureTime:string;
  arrivalTime:string;
  fare:number;
  availableSeats:number;
}