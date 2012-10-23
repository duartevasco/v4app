/*
 * GET home page.
 */
 exports.index = function(req, res){
    res.render('week_graph', { title: 'Week Graph' });
 };
