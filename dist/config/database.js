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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPool = exports.dbConfig = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
exports.dbConfig = {
    host: '192.254.186.198',
    user: 'firozem_osbdcms',
    password: 'osbdcms@1234',
    database: 'firozem_headlesscms',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};
const createPool = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = promise_1.default.createPool(exports.dbConfig);
        yield pool.getConnection(); // Test connection
        return pool;
    }
    catch (error) {
        throw new Error(`Database connection failed: ${error}`);
    }
});
exports.createPool = createPool;
