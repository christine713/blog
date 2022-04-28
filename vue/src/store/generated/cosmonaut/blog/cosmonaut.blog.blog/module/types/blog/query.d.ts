import { Reader, Writer } from "protobufjs/minimal";
import { Params } from "../blog/params";
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
import { Post } from "../blog/post";
export declare const protobufPackage = "cosmonaut.blog.blog";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params holds all the parameters of this module. */
    params: Params | undefined;
}
export interface QueryPostsRequest {
    /** Adding pagination to request */
    pagination: PageRequest | undefined;
}
export interface QueryPostsResponse {
    /** Returning a list of posts */
    Post: Post[];
    /** Adding pagination to response */
    pagination: PageResponse | undefined;
}
export declare const QueryParamsRequest: {
    encode(_: QueryParamsRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest;
    fromJSON(_: any): QueryParamsRequest;
    toJSON(_: QueryParamsRequest): unknown;
    fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest;
};
export declare const QueryParamsResponse: {
    encode(message: QueryParamsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse;
    fromJSON(object: any): QueryParamsResponse;
    toJSON(message: QueryParamsResponse): unknown;
    fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse;
};
export declare const QueryPostsRequest: {
    encode(message: QueryPostsRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryPostsRequest;
    fromJSON(object: any): QueryPostsRequest;
    toJSON(message: QueryPostsRequest): unknown;
    fromPartial(object: DeepPartial<QueryPostsRequest>): QueryPostsRequest;
};
export declare const QueryPostsResponse: {
    encode(message: QueryPostsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryPostsResponse;
    fromJSON(object: any): QueryPostsResponse;
    toJSON(message: QueryPostsResponse): unknown;
    fromPartial(object: DeepPartial<QueryPostsResponse>): QueryPostsResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Parameters queries the parameters of the module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** Queries a list of Posts items. */
    Posts(request: QueryPostsRequest): Promise<QueryPostsResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    Posts(request: QueryPostsRequest): Promise<QueryPostsResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
