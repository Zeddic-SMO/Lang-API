"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerHelperModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_helper_service_1 = require("./mailer-helper.service");
const mailer_helper_controller_1 = require("./mailer-helper.controller");
const mailer_1 = require("@nestjs-modules/mailer");
let MailerHelperModule = class MailerHelperModule {
};
exports.MailerHelperModule = MailerHelperModule;
exports.MailerHelperModule = MailerHelperModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.EMAIL_HOST,
                    port: process.env.EMAIL_PORT,
                    secure: true,
                    auth: {
                        user: process.env.EMAIL_ID,
                        pass: process.env.EMAIL_PASS,
                    },
                },
            }),
        ],
        controllers: [mailer_helper_controller_1.MailerHelperController],
        providers: [mailer_helper_service_1.MailerHelperService],
        exports: [mailer_helper_service_1.MailerHelperService],
    })
], MailerHelperModule);
//# sourceMappingURL=mailer-helper.module.js.map