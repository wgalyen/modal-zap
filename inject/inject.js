/* eslint-env browser */

;(function () {
  try {
    const chainToProp = (chain) => {
      return chain
        .split('.')
        .reduce(
          (value, method) =>
            value &&
            value instanceof Object &&
            Object.prototype.hasOwnProperty.call(value, method)
              ? value[method]
              : undefined,
          window
        )
    }

    const Functions = {
      defined(chain) {
        return chainToProp(chain) !== undefined
      },
      call(chain, ...args) {
        chainToProp(chain)?.(...args)
      },
    }

    const receiveMessage = ({ data: { modalzapRequest } }) => {
      if (!modalzapRequest) {
        return
      }

      const { func, args, uid } = modalzapRequest

      removeEventListener('message', receiveMessage)

      postMessage({
        modalzapResponse: {
          uid,
          message:
            func && Functions[func] ? Functions[func](...(args || [])) : false,
        },
      })
    }

    addEventListener('message', receiveMessage)
  } catch (error) {
    // Fail quietly
  }
})()
