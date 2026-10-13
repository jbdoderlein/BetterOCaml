// Merlin primitives for case-insensitive file systems: the files of the worker come
// from URLs, their names are exact.

//Provides: ml_merlin_fs_exact_case
function ml_merlin_fs_exact_case(path) {
  return path;
}

//Provides: ml_merlin_fs_exact_case_basename
function ml_merlin_fs_exact_case_basename(path) {
  return 0; // None
}
