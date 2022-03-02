function index(req, res) {
    req.getConnection(function (err, conn) {
        conn.query('SELECT * FROM categories', function (err, categories) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.render('categories/index', {
                active_categories: 'mm-active',
                categories: categories
            });
        });
    });
}

function create(req, res) {
    res.render('categories/create', {
        active_categories_create: 'mm-active'
    });
}

function store(req, res) {
    var data = req.body;
    req.getConnection(function (err, conn) {
        conn.query('INSERT INTO categories set ?', data, function (err, category) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.redirect('/categorias');
        });
    });
}

function edit(req, res) {
    var id = req.params.id;
    req.getConnection(function (err, conn) {
        conn.query('SELECT * FROM categories WHERE id = ?', [id], function (err, category) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.render('categories/edit', {
                active_categories_edit: 'mm-active',
                category: category[0]
            });
        });
    });
}

function update(req, res) {
    var data = req.body;
    var id = req.params.id;
    req.getConnection(function (err, conn) {
        conn.query('UPDATE categories set ? WHERE id = ?', [data, id], function (err, category) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.redirect('/categorias');
        });
    });
}

function destroy(req, res) {
    var id = req.body.id;
    req.getConnection(function (err, conn) {
        conn.query('DELETE FROM todos WHERE category_id = ?', [id], function (err, todos) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            conn.query('DELETE FROM categories WHERE id = ?', [id], function (err, category) {
                if (err) {
                    res.send(err);
                    console.log(err);
                }
                res.redirect('/categorias');
            });
        });
    });
}

module.exports = {
    index: index,
    create: create,
    store: store,
    edit: edit,
    update: update,
    destroy: destroy
}