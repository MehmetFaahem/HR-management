/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.EmployeeInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).employee.createMany(input as any))),

        create: procedure.input($Schema.EmployeeInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).employee.create(input as any))),

        deleteMany: procedure.input($Schema.EmployeeInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).employee.deleteMany(input as any))),

        delete: procedure.input($Schema.EmployeeInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).employee.delete(input as any))),

        findFirst: procedure.input($Schema.EmployeeInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).employee.findFirst(input as any))),

        findMany: procedure.input($Schema.EmployeeInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).employee.findMany(input as any))),

        findUnique: procedure.input($Schema.EmployeeInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).employee.findUnique(input as any))),

        updateMany: procedure.input($Schema.EmployeeInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).employee.updateMany(input as any))),

        update: procedure.input($Schema.EmployeeInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).employee.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.EmployeeCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmployeeCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmployeeCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmployeeCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.EmployeeCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmployeeCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.EmployeeGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.EmployeeGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmployeeCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmployeeCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.EmployeeGetPayload<T>, Context>) => Promise<Prisma.EmployeeGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.EmployeeDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmployeeDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmployeeDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmployeeDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.EmployeeDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmployeeDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.EmployeeGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.EmployeeGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmployeeDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmployeeDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.EmployeeGetPayload<T>, Context>) => Promise<Prisma.EmployeeGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.EmployeeFindFirstArgs, TData = Prisma.EmployeeGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.EmployeeFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.EmployeeGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.EmployeeFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.EmployeeFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.EmployeeGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.EmployeeGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.EmployeeFindManyArgs, TData = Array<Prisma.EmployeeGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.EmployeeFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.EmployeeGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.EmployeeFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.EmployeeFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.EmployeeGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.EmployeeGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.EmployeeFindUniqueArgs, TData = Prisma.EmployeeGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.EmployeeFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.EmployeeGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.EmployeeFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.EmployeeFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.EmployeeGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.EmployeeGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.EmployeeUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmployeeUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmployeeUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmployeeUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.EmployeeUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.EmployeeUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.EmployeeGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.EmployeeGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.EmployeeUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.EmployeeUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.EmployeeGetPayload<T>, Context>) => Promise<Prisma.EmployeeGetPayload<T>>
            };

    };
}
