Jason
=====

Usage
-----

`npm install JAForbes/jason`

```

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

```
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

```
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

`jason` is not production ready at all.  There has been no attempt the JSON spec at all.

But if you just want to throw arrays of non-nested objects, it should work fine.
