Jason
=====

Usage
-----

`npm install JAForbes/jason`


```javascript

var generated_C = require( 'jason' )( 'people', 'Person', [
    {
      first: "James",
      last: "Forbes",
      age: 26,
      awesome: true
    }
  ]
)

```

`generated_C` would look like the following

```c
struct Person {
  char *first;
  char *last;
  float age;
  int awesome;
};
struct Person people[] = {
  {"James","Forbes",24, 1},
};
```

Save that as a file called `people.c` and `#include` it in your C app:

```c
#include <stdio.h>
#include "people.c"

int main(){
  Person james = people[0];
  printf( "%s %s %f %d", james.first, james.last, james.age, james.awesome );
  return 0;
}
```

Warning
-------

`jason` is not production ready at all.  

There has been no attempt to cover the entire JSON spec, just my own personal
use case.

But if you just want to throw arrays of non-nested object at its, it should work fine.
