module.exports = recents;


recents = function(day){

              if(day=="monday"){

                 
                 res.render('showlist',{'user':req.session.user , 'title':"IIIT DM TaxiPort",'item':JSON.stringify(docs[0].monday[0].time)});
              }

              else if(day=="tuesday"){

                 
                 res.render('showlist',{'user':req.session.user , 'title':"IIIT DM TaxiPort",'item':JSON.stringify(docs[0].tuesday[0].time)});
              }

              else if(day=="wednesday"){

                 
                 res.render('showlist',{'user':req.session.user , 'title':"IIIT DM TaxiPort",'item':JSON.stringify(docs[0].wednesday[0].time)});
              }

              else if(day=="thursday"){

                 
                 res.render('showlist',{'user':req.session.user , 'title':"IIIT DM TaxiPort",'item':JSON.stringify(docs[0].thursday[0].time)});
              }
              else if(day=="friday"){

                 
                 res.render('showlist',{'user':req.session.user , 'title':"IIIT DM TaxiPort",'item':JSON.stringify(docs[0].friday[0].time)});
              }

              else if(day=="saturday"){

                 
                 res.render('showlist',{'user':req.session.user , 'title':"IIIT DM TaxiPort",'item':JSON.stringify(docs[0].saturday[0].time)});
              }

              else if(day=="sunday"){

                 
                 res.render('showlist',{'user':req.session.user , 'title':"IIIT DM TaxiPort",'item':JSON.stringify(docs[0].sunday[0].time)});
              }


}