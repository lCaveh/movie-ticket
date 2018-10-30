//Business Logic
// Business Logic for AddressBook ---------
function AllTickets() {
  this.tickets = [],
  this.currentId = 0
  this.price= 0;
}

AllTickets.prototype.addTicket = function(ticket) {
  ticket.id = this.assignId();
  this.tickets.push(ticket);
  this.price += ticket.price;
  return this.price;
}

AllTickets.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AllTickets.prototype.findTicket = function(id) {
  for (var i=0; i< this.tickets.length; i++) {
    if (this.tickets[i]) {
      if (this.tickets[i].id == id) {
        return this.tickets[i];
      }
    }
  };
  return false;
}

AllTickets.prototype.deleteTicket = function(id) {
  for (var i=0; i< this.tickets.length; i++) {
    if (this.tickets[i]) {
      if (this.tickets[i].id == id) {
        this.price-=this.tickets[i].price;
        delete this.tickets[i];
      }
    }
  };
}

// Business Logic for Contacts ---------
function Ticket(inputtedMovie, inputtedTime, inputtedAge) {
  this.movie = inputtedMovie,
  this.time = inputtedTime,
  this.age = inputtedAge,
  this.price =0
}
Ticket.prototype.ticketPrice = function() {
  this.price = 20;
  if (this.movie=="bohemian") {
    this.price = 25;
  } else if (this.movie=="halloween"){
    this.price = 15;
  };
  if (this.time=="morning") {
    this.price -= 5;
  } else if (this.time=="evening"){
    this.price +=5;
  };
  if (this.age=="minor") {
    this.price -= 8;
  } else if (this.age=="senior"){
    this.price -=5;
  };
  return this.price;
}


// User Interface Logic ---------
var allTickets = new AllTickets();

function displayTicketDetails(ticketToDisplay) {
  var ticketList = $("ul#tickets");
  var htmlForTicketInfo = "";
  ticketToDisplay.tickets.forEach(function(ticket) {
    htmlForTicketInfo += "<li id=" + ticket.id + ">" + ticket.movie + "</li>";
  });
  ticketList.html(htmlForTicketInfo);
};

function showTicket(ticketId) {
  var ticket = allTickets.findTicket(ticketId);
  $("#show-ticket").show();
  $(".movie").html(ticket.movie);
  $(".time").html(ticket.time);
  $(".age").html(ticket.age);
  $(".price").html(ticket.price);

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + ticket.id + ">Delete</button>");
}


function attachTicketListeners() {
  $("ul#tickets").on("click", "li", function() {
    showTicket(this.id);
    console.log(this);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    allTickets.deleteTicket(this.id);
    $(".ticket-price").text("The total price :"+allTickets.price);
    $("#show-ticket").hide();
    displayTicketDetails(allTickets);
  });
};


$(document).ready(function() {
  attachTicketListeners();
  $("form#new-ticket").submit(function(event) {
    event.preventDefault();
    var inputtedMovie= $("#new-movie").val();
    var inputtedTime = $("#new-time").val();
    var inputtedAge = $("#new-age").val();
    var newTicket = new Ticket(inputtedMovie, inputtedTime, inputtedAge);
    newTicket.ticketPrice();
    allTickets.addTicket(newTicket);
    $(".ticket-price").text("The total price :"+allTickets.price);
    displayTicketDetails(allTickets);
    console.log(newTicket);
    console.log(allTickets);

  })
})
