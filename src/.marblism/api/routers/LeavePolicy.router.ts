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

        createMany: procedure.input($Schema.LeavePolicyInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).leavePolicy.createMany(input as any))),

        create: procedure.input($Schema.LeavePolicyInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).leavePolicy.create(input as any))),

        deleteMany: procedure.input($Schema.LeavePolicyInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).leavePolicy.deleteMany(input as any))),

        delete: procedure.input($Schema.LeavePolicyInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).leavePolicy.delete(input as any))),

        findFirst: procedure.input($Schema.LeavePolicyInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).leavePolicy.findFirst(input as any))),

        findMany: procedure.input($Schema.LeavePolicyInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).leavePolicy.findMany(input as any))),

        findUnique: procedure.input($Schema.LeavePolicyInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).leavePolicy.findUnique(input as any))),

        updateMany: procedure.input($Schema.LeavePolicyInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).leavePolicy.updateMany(input as any))),

        update: procedure.input($Schema.LeavePolicyInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).leavePolicy.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.LeavePolicyCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LeavePolicyCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LeavePolicyCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LeavePolicyCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.LeavePolicyCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LeavePolicyCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.LeavePolicyGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.LeavePolicyGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LeavePolicyCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LeavePolicyCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.LeavePolicyGetPayload<T>, Context>) => Promise<Prisma.LeavePolicyGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.LeavePolicyDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LeavePolicyDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LeavePolicyDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LeavePolicyDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.LeavePolicyDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LeavePolicyDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.LeavePolicyGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.LeavePolicyGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LeavePolicyDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LeavePolicyDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.LeavePolicyGetPayload<T>, Context>) => Promise<Prisma.LeavePolicyGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.LeavePolicyFindFirstArgs, TData = Prisma.LeavePolicyGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.LeavePolicyFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.LeavePolicyGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.LeavePolicyFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.LeavePolicyFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.LeavePolicyGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.LeavePolicyGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.LeavePolicyFindManyArgs, TData = Array<Prisma.LeavePolicyGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.LeavePolicyFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.LeavePolicyGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.LeavePolicyFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.LeavePolicyFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.LeavePolicyGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.LeavePolicyGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.LeavePolicyFindUniqueArgs, TData = Prisma.LeavePolicyGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.LeavePolicyFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.LeavePolicyGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.LeavePolicyFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.LeavePolicyFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.LeavePolicyGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.LeavePolicyGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.LeavePolicyUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LeavePolicyUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LeavePolicyUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LeavePolicyUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.LeavePolicyUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.LeavePolicyUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.LeavePolicyGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.LeavePolicyGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.LeavePolicyUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.LeavePolicyUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.LeavePolicyGetPayload<T>, Context>) => Promise<Prisma.LeavePolicyGetPayload<T>>
            };

    };
}
