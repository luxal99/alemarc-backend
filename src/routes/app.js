"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt");
var UserService_1 = require("../service/UserService");
var User_1 = require("../entity/User");
var TechnologyService_1 = require("../service/TechnologyService");
var Technology_1 = require("../entity/Technology");
var ImageService_1 = require("../service/ImageService");
var Image_1 = require("../entity/Image");
var Blog_1 = require("../entity/Blog");
var BlogService_1 = require("../service/BlogService");
var MessageService_1 = require("../service/MessageService");
var Message_1 = require("../entity/Message");
var App = /** @class */ (function () {
    function App(userRouteName, blogRouteName, messageRouteName, imageRouteName, technologyRouteName) {
        this.userRouteName = userRouteName;
        this.blogRouteName = blogRouteName;
        this.messageRouteName = messageRouteName;
        this.imageRouteName = imageRouteName;
        this.technologyRouteName = technologyRouteName;
        this.app = express();
        this.plugins();
        this.userRoute();
        this.technologyRoute();
        this.blogRoute();
        this.messageRoute();
    }
    App.prototype.plugins = function () {
        this.app.use(bodyParser.json());
    };
    App.prototype.userRoute = function () {
        var _this = this;
        this.app.get("/" + this.userRouteName, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        _b = (_a = res).send;
                        return [4 /*yield*/, User_1.User.find()];
                    case 1:
                        _b.apply(_a, [_d.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        _c = _d.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.app.post("/" + this.userRouteName, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userService, _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 2, , 3]);
                        _b = (_a = new UserService_1.UserService()).save;
                        _c = User_1.User.bind;
                        _d = [void 0, req.body.username];
                        return [4 /*yield*/, bcrypt.hash(req.body.password, 10)];
                    case 1:
                        userService = _b.apply(_a, [new (_c.apply(User_1.User, _d.concat([_f.sent()])))()]);
                        res.sendStatus(200);
                        return [3 /*break*/, 3];
                    case 2:
                        _e = _f.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.app.post("/" + this.userRouteName + "/auth", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user, auth, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, new UserService_1.UserService().findByName(req.body.username)];
                    case 1:
                        user = _c.sent();
                        _a = user != null;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt.compare(req.body.password, user.password)];
                    case 2:
                        _a = (_c.sent());
                        _c.label = 3;
                    case 3:
                        auth = ((_a)
                            ? res.send(user.password) : res.sendStatus(403));
                        return [3 /*break*/, 5];
                    case 4:
                        _b = _c.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    App.prototype.blogRoute = function () {
        var _this = this;
        this.app.post("/" + this.blogRouteName, function (req, res) {
            try {
                var blog_1 = new Blog_1.Blog(req.body.header, req.body.shortText, req.body.longText, req.body.listOfTechnologies);
                var blogService = new BlogService_1.BlogService().save(blog_1).then(function () {
                    for (var _i = 0, _a = req.body.listOfImages; _i < _a.length; _i++) {
                        var image = _a[_i];
                        var imageService = new ImageService_1.ImageService().save(new Image_1.Image(image.url, blog_1)).then(function () {
                        });
                    }
                }).then(function () {
                    res.sendStatus(200);
                });
            }
            catch (_a) {
                res.sendStatus(500);
            }
        });
        this.app.get("/" + this.blogRouteName, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var listOfBlogs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Blog_1.Blog.find({ relations: ['listOfImages', 'listOfTechnologies'] })];
                    case 1:
                        listOfBlogs = _a.sent();
                        res.send(listOfBlogs);
                        return [2 /*return*/];
                }
            });
        }); });
        this.app.get("/" + this.blogRouteName + "/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var blog, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new BlogService_1.BlogService().findById(req.params.id)];
                    case 1:
                        blog = _b.sent();
                        res.send(blog);
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.app.put("/" + this.blogRouteName + "/view", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var blogService, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        blogService = new BlogService_1.BlogService();
                        return [4 /*yield*/, blogService.incrementView(req.body.id)];
                    case 1:
                        _b.sent();
                        res.send(200);
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.app.post("/" + this.blogRouteName + "/:popular", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var mostPopular, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new BlogService_1.BlogService().mostPopular()];
                    case 1:
                        mostPopular = _b.sent();
                        res.send(mostPopular);
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    App.prototype.technologyRoute = function () {
        var _this = this;
        this.app.post("/" + this.technologyRouteName, function (req, res) {
            try {
                var technologyService = new TechnologyService_1.TechnologyService().save(new Technology_1.Technology(req.body.title));
                res.sendStatus(200);
            }
            catch (_a) {
                res.sendStatus(500);
            }
        });
        this.app.get("/" + this.technologyRouteName, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var technologies, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Technology_1.Technology.find()];
                    case 1:
                        technologies = _b.sent();
                        res.send(technologies);
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    App.prototype.messageRoute = function () {
        var _this = this;
        this.app.post("/" + this.messageRouteName, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var messageService, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        if (!(new MessageService_1.MessageService().valid(req.body.email))) {
                            throw Error("");
                        }
                        return [4 /*yield*/, new MessageService_1.MessageService().save(new Message_1.Message(req.body.full_name, req.body.email, req.body.message))];
                    case 1:
                        messageService = _b.sent();
                        res.sendStatus(200);
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    return App;
}());
exports.App = App;
