/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createEmployeeRouter from "./Employee.router";
import createReviewCycleRouter from "./ReviewCycle.router";
import createDocumentRouter from "./Document.router";
import createLeavePolicyRouter from "./LeavePolicy.router";
import createLeaveRouter from "./Leave.router";
import createReviewRouter from "./Review.router";
import createJobPostingRouter from "./JobPosting.router";
import createOrganizationRouter from "./Organization.router";
import createOrganizationRoleRouter from "./OrganizationRole.router";
import createUserRouter from "./User.router";
import createAccountRouter from "./Account.router";
import createSessionRouter from "./Session.router";
import { ClientType as EmployeeClientType } from "./Employee.router";
import { ClientType as ReviewCycleClientType } from "./ReviewCycle.router";
import { ClientType as DocumentClientType } from "./Document.router";
import { ClientType as LeavePolicyClientType } from "./LeavePolicy.router";
import { ClientType as LeaveClientType } from "./Leave.router";
import { ClientType as ReviewClientType } from "./Review.router";
import { ClientType as JobPostingClientType } from "./JobPosting.router";
import { ClientType as OrganizationClientType } from "./Organization.router";
import { ClientType as OrganizationRoleClientType } from "./OrganizationRole.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as AccountClientType } from "./Account.router";
import { ClientType as SessionClientType } from "./Session.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        employee: createEmployeeRouter(router, procedure),
        reviewCycle: createReviewCycleRouter(router, procedure),
        document: createDocumentRouter(router, procedure),
        leavePolicy: createLeavePolicyRouter(router, procedure),
        leave: createLeaveRouter(router, procedure),
        review: createReviewRouter(router, procedure),
        jobPosting: createJobPostingRouter(router, procedure),
        organization: createOrganizationRouter(router, procedure),
        organizationRole: createOrganizationRoleRouter(router, procedure),
        user: createUserRouter(router, procedure),
        account: createAccountRouter(router, procedure),
        session: createSessionRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    employee: EmployeeClientType<AppRouter>;
    reviewCycle: ReviewCycleClientType<AppRouter>;
    document: DocumentClientType<AppRouter>;
    leavePolicy: LeavePolicyClientType<AppRouter>;
    leave: LeaveClientType<AppRouter>;
    review: ReviewClientType<AppRouter>;
    jobPosting: JobPostingClientType<AppRouter>;
    organization: OrganizationClientType<AppRouter>;
    organizationRole: OrganizationRoleClientType<AppRouter>;
    user: UserClientType<AppRouter>;
    account: AccountClientType<AppRouter>;
    session: SessionClientType<AppRouter>;
}
