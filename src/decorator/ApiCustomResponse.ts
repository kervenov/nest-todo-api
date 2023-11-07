export function ApiCustomResponse() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(`Calling method: ${key}`);
      const result = originalMethod.apply(this, args);
      return result;
    };
  };
}
