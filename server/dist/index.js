'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('graphql-yoga'),
    GraphQLServer = _require.GraphQLServer;

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

var Todo = mongoose.model('Todo', {
  text: String,
  complete: Boolean
});

var typeDefs = '\n  type Query {\n    hello(name: String): String!\n    todos: [Todo]\n  }\n  type Todo {\n    id: ID\n    text: String!\n    complete: Boolean!\n  }\n  type Mutation {\n    createTodo(text: String!) : Todo\n    updateTodo(id: ID!, complete: Boolean!): Boolean\n    removeTodo(id: ID!): Boolean\n  }\n';

var resolvers = {
  Query: {
    hello: function hello(_, _ref) {
      var name = _ref.name;
      return 'Hello ' + (name || 'World');
    },
    todos: function todos() {
      return Todo.find();
    }
  },
  Mutation: {
    createTodo: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref3) {
        var text = _ref3.text;
        var todo;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                todo = new Todo({ text: text, complete: false });
                _context.next = 3;
                return todo.save();

              case 3:
                return _context.abrupt('return', todo);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function createTodo(_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }(),
    updateTodo: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref5) {
        var id = _ref5.id,
            complete = _ref5.complete;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Todo.findByIdAndUpdate(id, { complete: complete });

              case 2:
                return _context2.abrupt('return', true);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function updateTodo(_x3, _x4) {
        return _ref4.apply(this, arguments);
      };
    }(),
    removeTodo: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref7) {
        var id = _ref7.id;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return Todo.findByIdAndRemove(id);

              case 2:
                return _context3.abrupt('return', true);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      return function removeTodo(_x5, _x6) {
        return _ref6.apply(this, arguments);
      };
    }()
  }
};
var server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});
mongoose.connection.once('open', function () {
  server.start(function () {
    return console.log('Server is running on localhost:4000');
  });
});