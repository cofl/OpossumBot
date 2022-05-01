TSC=npx tsc
TARGET=bot
.PHONY=all clean run

all: bot

$(TARGET):
	$(TSC) --build src

watch:
	$(TSC) --watch src

run: $(TARGET)
	node .

clean:
	rm -rf build *.tsbuildinfo
