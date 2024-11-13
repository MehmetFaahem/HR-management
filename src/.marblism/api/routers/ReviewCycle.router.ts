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

        createMany: procedure.input($Schema.ReviewCycleInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).reviewCycle.createMany(input as any))),

        create: procedure.input($Schema.ReviewCycleInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).reviewCycle.create(input as any))),

        deleteMany: procedure.input($Schema.ReviewCycleInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).reviewCycle.deleteMany(input as any))),

        delete: procedure.input($Schema.ReviewCycleInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).reviewCycle.delete(input as any))),

        findFirst: procedure.input($Schema.ReviewCycleInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).reviewCycle.findFirst(input as any))),

        findMany: procedure.input($Schema.ReviewCycleInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).reviewCycle.findMany(input as any))),

        findUnique: procedure.input($Schema.ReviewCycleInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).reviewCycle.findUnique(input as any))),

        updateMany: procedure.input($Schema.ReviewCycleInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).reviewCycle.updateMany(input as any))),

        update: procedure.input($Schema.ReviewCycleInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).reviewCycle.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ReviewCycleCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ReviewCycleCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ReviewCycleCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ReviewCycleCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ReviewCycleCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ReviewCycleCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ReviewCycleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ReviewCycleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ReviewCycleCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ReviewCycleCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ReviewCycleGetPayload<T>, Context>) => Promise<Prisma.ReviewCycleGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ReviewCycleDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ReviewCycleDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ReviewCycleDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ReviewCycleDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ReviewCycleDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ReviewCycleDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ReviewCycleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ReviewCycleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ReviewCycleDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ReviewCycleDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ReviewCycleGetPayload<T>, Context>) => Promise<Prisma.ReviewCycleGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ReviewCycleFindFirstArgs, TData = Prisma.ReviewCycleGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ReviewCycleFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ReviewCycleGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ReviewCycleFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ReviewCycleFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ReviewCycleGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ReviewCycleGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ReviewCycleFindManyArgs, TData = Array<Prisma.ReviewCycleGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.ReviewCycleFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ReviewCycleGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ReviewCycleFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ReviewCycleFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ReviewCycleGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ReviewCycleGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ReviewCycleFindUniqueArgs, TData = Prisma.ReviewCycleGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ReviewCycleFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ReviewCycleGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ReviewCycleFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ReviewCycleFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ReviewCycleGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ReviewCycleGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ReviewCycleUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ReviewCycleUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ReviewCycleUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ReviewCycleUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ReviewCycleUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ReviewCycleUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ReviewCycleGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ReviewCycleGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ReviewCycleUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ReviewCycleUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ReviewCycleGetPayload<T>, Context>) => Promise<Prisma.ReviewCycleGetPayload<T>>
            };

    };
}
