
Template.inform.events({
    "click .profile-delete-icon": function(){Projects.remove(this._id);}
})

Template.add.events({
    "submit #makeproject": function(event){
        event.preventDefault();
        var projname = event.target.projname.value;
        var firstname = event.target.firstname.value;
        var lastname = event.target.lastname.value;
        var meteorURL = event.target.meteorURL.value;
        var gitURL = event.target.gitURL.value;
        Projects.insert({projname:projname, firstname:firstname, lastname:lastname, meteorURL:meteorURL, gitURL:gitURL});
        Router.go('quiz1');
        
    }
});

Template.show.helpers({
    exec: function(){return Projects.find({},{sort: {projname: 1, firstname: 1, lastname: 1}});}
});
