


Template.quiz1.events({'submit #projform':function(event){
        event.preventDefault();

        Projects.insert({projname:projname.value,firstname:firstname.value,lastname:lastname.value,meteorURL:meteorURL.value,githubURL:githubURL.value
        });

        projname.value = '';
        firstname.value = '';
        lastname.value = '';
        meteorURL.value = '';
        githubURL.value = '';

    },

    'click .delete-proj':function(event){
        Projects.remove(this._id);
    }
});

Template.quiz1.helpers({exec:function(){return Projects.find({},{sort:{projname:1,firstname:1,lastname:1}}).fetch();}

});

