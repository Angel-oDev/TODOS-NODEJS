function index(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT todos.id id, todos.title title, categories.id category_id, categories.name category_name, categories.color category_color FROM todos LEFT JOIN categories ON todos.category_id = categories.id', (err, todos) => {
            if (err) {
                console.log(err);
                res.send('Error');
            }
            res.render('todos/index', {
                todos: todos,
                active_todos: 'mm-active'
            });
        });
    });
}

function create(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM categories', (err, categories) => {
            if (err) {
                console.log(err);
                res.send('Error');
            }
            res.render('todos/create', {
                categories: categories,
                active_todos_create: 'mm-active'
            });
        });
    });
}

function store(req, res) {
    const data = {
        title: req.body.title,
        category_id: req.body.category_id,
    }
    const created_at = new Date();
    const updated_at = new Date();
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO todos SET ?', {
            title: data.title,
            category_id: data.category_id,
            created_at: created_at,
            updated_at: updated_at
        }, (err, todo) => {
            if (err) {
                console.log(err);
                res.send('Error');
            }
            res.redirect('/tareas');
        });
    });
}

function edit(req, res) {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM todos WHERE id = ?', [id], (err, todo) => {
            if (err) {
                console.log(err);
                res.send('Error');
            }
            conn.query('SELECT * FROM categories', (err, categories) => {
                if (err) {
                    console.log(err);
                    res.send('Error');
                }
                res.render('todos/edit', {
                    todo: todo[0],
                    categories: categories,
                    active_todos_edit: 'mm-active'
                });
            });
        });
    });
}

function update(req, res) {
    const id = req.params.id;
    const data = req.body;
    const updated_at = new Date();
    req.getConnection((err, conn) => {
        conn.query('UPDATE todos SET ? WHERE id = ?', [{
            title: data.title,
            category_id: data.category_id,
            updated_at: updated_at
        }, id], (err, todo) => {
            if (err) {
                console.log(err);
                res.send('Error');
            }
            res.redirect('/tareas');
        });
    });
}

function destroy(req, res) {
    const id = req.body.id;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM todos WHERE id = ?', [id], (err, todo) => {
            if (err) {
                console.log(err);
                res.send('Error');
            }
            res.redirect('/tareas');
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