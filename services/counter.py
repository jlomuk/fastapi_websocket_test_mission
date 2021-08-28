def get_counter(FAKE_DB):
    counter = len(FAKE_DB)
    while True:
        counter += 1
        yield counter
