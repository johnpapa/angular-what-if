import { authInterceptor } from './auth.interceptor';
import { busyInterceptor } from './busy.interceptor';
import { csrfInterceptor } from './csrf.interceptor';
import { ensureSSLInterceptor } from './ensure-ssl.interceptor';
import { globalHeaders } from './global.headers';
import { logHeadersInterceptor } from './log-headers.interceptor';
import { logHttpInterceptor } from './log-http.interceptor';
import { readOnlyInterceptor } from './read-only.interceptor';
import { transformInterceptor } from './transform.interceptor';

/**
 *  Interceptors:
 *    Axios's interceptors flow in the reverse of the order you provide them.
 *    If you provide interceptors A, then B, then C,
 *    then requests will flow in C->b->A and responses will flow out A->B->C.
 *    Therefore, it is important to add them in the reverse of the
 *    order you want them to execute.
 *    ... but ...
 *    This might make the code confusing to read, since we
 *    think of the order that we add them as being how they are applied.
 *    So why not list them in the order we want? We can do this by:
 *      1. adding the functions that apply the interceptors to an array in the order we want them to be applied
 *      2. reversing the array, to get them how Axios interceptors wants them
 *      3. executing the functions that apply the interceptors
 */
export function applyHttpInterceptors() {
  globalHeaders();

  const interceptors = [
    /**
     *  Log Http:
     *    This logs all HTTP traffic.
     *    Do this first so it can log the Http call happening in and out (last).
     */
    logHttpInterceptor,
    /**
     * ReadOnly:
     *    This makes sure that HTTP POST, PUT and DELETE are not allowed if the
     *    user does not have permission. If they do not, then it cancels the request.
     *    Do this early, before we add headers, get busy, or execute the request.
     */
    readOnlyInterceptor,
    /**
       SSL:
     *    Ensure SSL by making calls that use http instead use https.
     */
    ensureSSLInterceptor,
    /**
     * Auth:
     *    Add the authentication headers.
     */
    authInterceptor,
    /**
     * CSRF:
     *    Add the CSRF headers.
     */
    csrfInterceptor,
    /**
     *  Log headers:
     *    Log all headers.
     *    Must come after the headers are stuffed and before the request is made.
     */
    logHeadersInterceptor,
    /**
     *  Busy:
     *    Enable and increment the count of HTTP requests, which can be used to show a busy indicator.
     *    Also decrement the count when responses are received, to eventually turn off the busy indicator.
     *    This must happen once it is certain a request will be made,
     *    and right after the response is received.
     */
    busyInterceptor,
    /**
     * Transform Response:
     *    Transform the response, making it easier to consume.
     *    This could happen anywhere in this particular stream,
     *    as it operates on the response.
     */
    transformInterceptor,
  ];

  interceptors.reverse().forEach((f) => f());
}
