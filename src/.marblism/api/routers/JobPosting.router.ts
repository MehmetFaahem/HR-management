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

        createMany: procedure.input($Schema.JobPostingInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobPosting.createMany(input as any))),

        create: procedure.input($Schema.JobPostingInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobPosting.create(input as any))),

        deleteMany: procedure.input($Schema.JobPostingInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobPosting.deleteMany(input as any))),

        delete: procedure.input($Schema.JobPostingInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobPosting.delete(input as any))),

        findFirst: procedure.input($Schema.JobPostingInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).jobPosting.findFirst(input as any))),

        findMany: procedure.input($Schema.JobPostingInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).jobPosting.findMany(input as any))),

        findUnique: procedure.input($Schema.JobPostingInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).jobPosting.findUnique(input as any))),

        updateMany: procedure.input($Schema.JobPostingInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobPosting.updateMany(input as any))),

        update: procedure.input($Schema.JobPostingInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobPosting.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.JobPostingCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobPostingCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobPostingCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobPostingCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.JobPostingCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobPostingCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JobPostingGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JobPostingGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobPostingCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobPostingCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JobPostingGetPayload<T>, Context>) => Promise<Prisma.JobPostingGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.JobPostingDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobPostingDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobPostingDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobPostingDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.JobPostingDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobPostingDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JobPostingGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JobPostingGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobPostingDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobPostingDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JobPostingGetPayload<T>, Context>) => Promise<Prisma.JobPostingGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.JobPostingFindFirstArgs, TData = Prisma.JobPostingGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.JobPostingFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.JobPostingGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JobPostingFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.JobPostingFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.JobPostingGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.JobPostingGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.JobPostingFindManyArgs, TData = Array<Prisma.JobPostingGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.JobPostingFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.JobPostingGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JobPostingFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.JobPostingFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.JobPostingGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.JobPostingGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.JobPostingFindUniqueArgs, TData = Prisma.JobPostingGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.JobPostingFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.JobPostingGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JobPostingFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.JobPostingFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.JobPostingGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.JobPostingGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.JobPostingUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobPostingUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobPostingUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobPostingUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.JobPostingUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobPostingUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JobPostingGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JobPostingGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobPostingUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobPostingUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JobPostingGetPayload<T>, Context>) => Promise<Prisma.JobPostingGetPayload<T>>
            };

    };
}
