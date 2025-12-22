import { ChangeEvent } from 'react';

class OnChangeHandlerBuilder {
  #cases: [string, (value: string) => void][] = [];

  get cases() {
    return [...this.#cases];
  }

  addCase(name: string, action: (value: string) => void) {
    this.#cases.push([name, action]);
    return this;
  }
}

export function createOnChangeHandler(
  callback: (builder: OnChangeHandlerBuilder) => void
) {
  const builder = new OnChangeHandlerBuilder();
  callback(builder);
  return ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let isProcessed = false;
    for (const [name, action] of builder.cases) {
      if (target.getAttribute('name') === name) {
        action(target.value);
        isProcessed = true;
      }
    }
    if (!isProcessed) {
      throw new Error(
        `Couldn't process the element with name: ${target.getAttribute(
          'name'
        )}`,
        { cause: target }
      );
    }
  };
}
