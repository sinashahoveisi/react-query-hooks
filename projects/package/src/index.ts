import StaticAxios, {AxiosInstance} from 'axios';
import {
  useCustomFetch,
  useCustomInfinite,
  useCustomPaginate,
  useCustomPost,
  useCustomModifyQuery,
  useCustomPersist,
  useCustomSubscribeQuery
} from 'hooks';
import {
  ConfigureProps,
  MutationOptionProps,
  QueryInfiniteOptionProps,
  QueryOptionProps,
  QueryPaginateOptionProps,
  UseFetchProps,
  UseFetchResultProps,
  UseInfiniteProps,
  UseInfiniteResultProps,
  UseModifyQueryProps,
  UseModifyQueryResultProps,
  UsePaginateProps,
  UsePaginateResultProps,
  UsePersistResultProps,
  UsePostProps,
  UsePostResultProps,
  UseSubscribeQueryProps
} from '../index';

function makeReactQueryHooks() {
  let axiosInstance: AxiosInstance = StaticAxios;
  let fetchQueryOptions: QueryOptionProps = {};
  let paginateQueryOptions: QueryPaginateOptionProps = {};
  let infiniteQueryOptions: QueryInfiniteOptionProps = {};
  let queryOptions: QueryOptionProps = {};
  let mutationOptions: MutationOptionProps = {};

  function configure(options: ConfigureProps) {
    if (options.axios !== undefined) {
      axiosInstance = options.axios;
    }
    if (options.fetchQueryOptions !== undefined) {
      fetchQueryOptions = options.fetchQueryOptions;
    }
    if (options.queryOptions !== undefined) {
      queryOptions = options.queryOptions;
    }
    if (options.paginateQueryOptions !== undefined) {
      paginateQueryOptions = options.paginateQueryOptions;
    }
    if (options.infiniteQueryOptions !== undefined) {
      infiniteQueryOptions = options.infiniteQueryOptions;
    }
    if (options.mutationOptions !== undefined) {
      mutationOptions = options.mutationOptions;
    }
  }

  function useFetch(props: Omit<UseFetchProps, 'axiosInstance'>): UseFetchResultProps {
    return useCustomFetch({
      axiosInstance,
      ...props,
      options: {
        ...queryOptions,
        ...fetchQueryOptions,
        ...props.options
      }
    });
  }

  function usePaginate(props: Omit<UsePaginateProps, 'axiosInstance'>): UsePaginateResultProps {
    return useCustomPaginate({
      axiosInstance,
      ...props,
      options: {
        ...queryOptions,
        ...paginateQueryOptions,
        ...props.options
      }
    });
  }

  function useInfinite(props: Omit<UseInfiniteProps, 'axiosInstance'>): UseInfiniteResultProps {
    return useCustomInfinite({
      axiosInstance,
      ...props,
      options: {
        ...infiniteQueryOptions,
        ...props.options
      }
    });
  }

  function usePost(props: Omit<UsePostProps, 'axiosInstance'>): UsePostResultProps {
    return useCustomPost({
      axiosInstance,
      ...props,
      options: {
        ...mutationOptions,
        ...props.options
      }
    });
  }

  function useModifyQuery(props: UseModifyQueryProps): UseModifyQueryResultProps {
    return useCustomModifyQuery(props);
  }

  function usePersist(): UsePersistResultProps {
    return useCustomPersist();
  }

  function useSubscribeQuery(props: UseSubscribeQueryProps): any {
    return useCustomSubscribeQuery(props);
  }

  return {configure, useFetch, usePaginate, useInfinite, usePost, useModifyQuery, usePersist, useSubscribeQuery};
}

const reactQueryHooksInstance = makeReactQueryHooks();

const {configure, useFetch, usePaginate, useInfinite, usePost, useModifyQuery, usePersist, useSubscribeQuery} =
  reactQueryHooksInstance;

export {configure, useFetch, usePaginate, useInfinite, usePost, useModifyQuery, usePersist, useSubscribeQuery};
